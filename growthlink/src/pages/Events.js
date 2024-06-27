import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Events.css';
import { Button } from '../components/Button';
import { useEventsContext } from '../EventsContext';

const Events = () => {

  const [events, setEvents] = useState([]);
  

  
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

  return (
    <div>
      
      <center>
        <h2 className='heading'>CHECK OUT THESE OPPORTUNITIES!</h2>
      </center>
      <div className="grid-container">
        {events.map((event, index) => (
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
    </div>
  );
};

const Frame = (props) => {
  const { name, description, Organisation, contact, date} = props;
  const {addToDashBoard} = useEventsContext();
  return (
    <div className='posting'>
      <div className='title'>
      <h3>{name}</h3>
      </div>
      <div className='content'>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Organisation:</strong> {Organisation}</p>
        <p><strong> Telegram Contact:</strong> {contact}</p>
        <p><strong>Application Period:</strong> {date}</p>
      </div>
      <div className='buttons'>
     
      <Button buttonSize='btn--small' buttonStyle='btn--primary' onClick={() => addToDashBoard(props) }>ADD TO DASHBOARD</Button>
      </div>
      
    </div>
  );
};

export default Events;