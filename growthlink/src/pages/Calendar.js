import React from 'react';
import { useEventsContext } from '../assets/EventsContext'; // Import context
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import Footer from '../components/Footer';

function Calendar() {
  const { calendarEvents } = useEventsContext(); 
  console.log(calendarEvents)

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="90vh"
        events={calendarEvents} 
      />
      <Footer />
    </div>
  );
}

export default Calendar;
