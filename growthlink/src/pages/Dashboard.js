import React from 'react';
import { useEventsContext } from '../assets/EventsContext';
import { Button } from '../components/Button';
import './Events.css';
import Footer from '../components/Footer';
import { FaBookmark } from 'react-icons/fa';

const Dashboard = () => {
  const { bookmarkedEvents } = useEventsContext();

  return (
    <div>
      <center>
        {bookmarkedEvents.length === 0 
          ? <h1 className='heading'>No Bookmarked Events!</h1>
          : <h1 className='heading'>Bookmarked Events!</h1>}
      </center>
      <div className='grid-container'>
        {bookmarkedEvents.length === 0 ? (
          <p>No events to display</p>
        ) : (
          bookmarkedEvents.map((event, index) => (
            <div key={index} className="grid-item">
              <DashboardItem event={event} />
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

const DashboardItem = ({ event }) => {
  const { name, description, Organisation, contact, date } = event;
  const { bookmarkEvent, addEvent } = useEventsContext();

  const handleAddToCalendar = () => {
    const eventToAdd = {
      title: name,
      start: date, // Ensure these are in the correct format
      end: date,   // Adjust end date as necessary
    };
    addEvent(eventToAdd);
  };

  return (
    <div className='posting'>
      <div className='title'>
        <h3>{name}</h3>
        <FaBookmark
          className={'bookmark-icon'}
          onClick={() => bookmarkEvent(event)}
        />
        <p className='posting-org'><strong>From: {Organisation}</strong></p>
      </div>
      <div className='content'>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Telegram Contact:</strong> {contact}</p>
        <p><strong>Application Deadline:</strong> {date}</p>
      </div>
      <div className='buttons'>
        <Button buttonSize='btn--small' buttonStyle='btn--primary' onClick={handleAddToCalendar}>
          ADD TO CALENDAR
        </Button>
      </div>
    </div>
  );
};


export default Dashboard;
