import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Events.css';
import { Button } from '../components/Button';
import { useEventsContext } from '../assets/EventsContext';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Footer from '../components/Footer';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Events'));
        const eventsData = querySnapshot.docs.map(doc => doc.data());
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Optionally: Implement debouncing for better performance
  }, [searchQuery, selectedDate, selectedOrganizations]);

  const uniqueOrganizations = Array.from(new Set(events.map(event => event.Organisation.trim())));
  const organizations = ['All', ...uniqueOrganizations];

  const handleFilterChange = (org) => {
    if (org === 'All') {
      setSelectedOrganizations([]);
    } else {
      setSelectedOrganizations(prevSelected =>
        prevSelected.includes(org)
          ? prevSelected.filter(selectedOrg => selectedOrg !== org)
          : [org, ...prevSelected]
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const isDate = (query) => !isNaN(Date.parse(query));

  const filteredEvents = events.filter(event => {
    // Convert the event date and query date to Date objects
    const eventDate = new Date(event.ApplicationPeriod);
    const searchDateObj = isDate(selectedDate) ? new Date(selectedDate) : null;

    // Check if the event name or organization matches the search query
    const queryLower = searchQuery.toLowerCase();
    const matchesName = event.Name.toLowerCase().includes(queryLower);
    const matchesOrganization = event.Organisation.toLowerCase().includes(queryLower);

    // Check if the event date is less than the selected date
    const matchesDate = searchDateObj ? eventDate < searchDateObj : true;

    // Check if the event organization matches the selected organizations
    const matchesOrgSelection = selectedOrganizations.length === 0 || selectedOrganizations.includes(event.Organisation.trim());

    // Combine all match conditions
    return (matchesName || matchesOrganization) && matchesDate && matchesOrgSelection;
  });

  return (
    <div className='main-content'>
      <center>
        <h2 className='heading'>CHECK OUT THESE OPPORTUNITIES!</h2>
      </center>

      <div className='filter-search-container'>
        <div className='filter-container'>
          {organizations.map((org, index) => (
            <button
              key={index}
              className={`filter-button ${selectedOrganizations.includes(org) ? 'active' : ''}`}
              onClick={() => handleFilterChange(org)}
            >
              {org}
            </button>
          ))}
        </div>

        <div className='search-container'>
          <input
            type="text"
            placeholder="Search by name or organization"
            value={searchQuery}
            onChange={handleSearchChange}
            className='search-input'
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className='date-picker-input'
          />
        </div>
      </div>

      <div className="grid-container">
        {filteredEvents.map((event, index) => (
          <div key={index} className="grid-item">
            <Frame
              name={event.Name}
              date={event.ApplicationPeriod}
              description={event.Description}
              contact={event.Contact}
              Organisation={event.Organisation}
              link={event.signUpLink}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

const Frame = (props) => {
  const { name, description, Organisation, contact, date } = props;
  const { addToDashBoard, bookmarkEvent, bookmarkedEvents } = useEventsContext();
  const isBookmarked = bookmarkedEvents.some(bookmark => bookmark.name === name);
  return (
    <div className='posting'>
      <div className='title'>
        <h3>{name}</h3>
        {isBookmarked 
          ? <FaBookmark className={'bookmark-icon bookmarked'} onClick={() => bookmarkEvent(props)}/> 
          : <FaRegBookmark className={`bookmark-icon`} onClick={() => bookmarkEvent(props)}/>
        }
        <p className='posting-org'><strong>From: {Organisation}</strong></p>
      </div>
      <div className='content'>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Telegram Contact:</strong> {contact}</p>
        <p><strong>Application Deadline:</strong> {date}</p>
      </div>
      <div className='buttons'>
        <Button buttonSize='btn--small' buttonStyle='btn--primary' onClick={() => addToDashBoard(props)}>ADD TO DASHBOARD</Button>
      </div>
    </div>
  );
};

export default Events;
