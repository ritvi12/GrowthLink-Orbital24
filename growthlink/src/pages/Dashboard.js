import React from 'react';
import { useEventsContext } from '../assets/EventsContext';
import { useAuthValue } from '../AuthContext';
import { Button } from '../components/Button';
import './Events.css';

const Dashboard = () => {
  const { dashboard, bookmarkedEvents } = useEventsContext();
  const { user } = useAuthValue();

  return (
    <div>
      <center>
        <h1 className='heading'>My DashBoard!</h1>
      </center>
      
      <div className='grid-container'>
        {dashboard.length === 0 ? (
          <h1>Your Events!</h1>
        ) : (
          dashboard.map((event, index) => (
            <div key={index} className="grid-item">
            <DashBoardItem 
              event={event} 
              key={index}
            />
            </div>
          ))
        )}
      </div>
      <center>
        <h1 className='heading'>Bookmarked Events!</h1>
      </center>
      <div className='grid-container'>
        {bookmarkedEvents.length === 0 ? (
          <></>
        ) : (
          bookmarkedEvents.map((event, index) => (
            <div key={index} className="grid-item">
            <DashBoardItem 
              event={event} 
              key={index}
            />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DashBoardItem = (props) => {
  const { name, description, Organisation, contact, date } = props.event;

  return (
    <div className='posting'>
      <h3 className='title'>{name}</h3>
      <div className='content'>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Organisation:</strong> {Organisation}</p>
      <p><strong>Telegram Contact:</strong> {contact}</p>
      <p><strong>Application Period:</strong> {date}</p>
      </div>
      <div className='buttons'>
        <Button buttonSize='btn--small' buttonStyle='btn--primary'>ADD TO CALENDAR</Button>
      </div>
    </div>
  );
};

export default Dashboard;
