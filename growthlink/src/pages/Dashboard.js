import React from 'react';
import { useEventsContext } from '../EventsContext';
import { useAuthValue } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import './Events.css';

const Dashboard = () => {
  const { dashboard } = useEventsContext();
  const { user } = useAuthValue();
  const navigate = useNavigate();

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
    </div>
  );
};

const DashBoardItem = (props) => {
  const { name, description, Organisation, contact, date } = props.event;

  return (
    <div>
      <h3>{name}</h3>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Organisation:</strong> {Organisation}</p>
      <p><strong>Telegram Contact:</strong> {contact}</p>
      <p><strong>Application Period:</strong> {date}</p>
      <div className='buttons'>
        <Button buttonSize='btn--small' buttonStyle='btn--primary'>ADD TO CALENDAR</Button>
      </div>
    </div>
  );
};

export default Dashboard;
