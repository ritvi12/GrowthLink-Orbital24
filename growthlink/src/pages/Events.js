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

  const filteredEvents = selectedOrganizations.length === 0
    ? events
    : events.filter(event => selectedOrganizations.includes(event.Organisation.trim()));

  return (
    <div>
      <center>
        <h2 className='heading'>CHECK OUT THESE OPPORTUNITIES!</h2>
      </center>
      
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
  const isBookmarked = bookmarkedEvents.some(bookmark => bookmark.name === name)
  return (
    <div className='posting'>
      <div className='title'>
        <h3>{name}</h3>
        {isBookmarked 
          ? <FaBookmark className={'bookmark-icon bookmarked'} onClick={() => bookmarkEvent(props)}/> 
          : <FaRegBookmark className={`bookmark-icon`} onClick={() => bookmarkEvent(props)}/>
          }
        
      </div>
      <div className='content'>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Organisation:</strong> {Organisation}</p>
        <p><strong>Telegram Contact:</strong> {contact}</p>
        <p><strong>Application Period:</strong> {date}</p>
      </div>
      <div className='buttons'>
        <Button buttonSize='btn--small' buttonStyle='btn--primary' onClick={() => addToDashBoard(props)}>ADD TO DASHBOARD</Button>
      </div>
    </div>
  );
};

export default Events;
