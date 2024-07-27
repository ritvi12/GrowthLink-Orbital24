import React from 'react';
import { useEventsContext } from '../assets/EventsContext'; // Import context
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

function Calendar() {
  const { calendarEvents } = useEventsContext(); // Get events from context

  // Remove duplicate events
  const removeDuplicates = (calendarEvents) => {
    const uniqueEvents = new Map();
  
    calendarEvents.forEach(event => {
      const eventId = event.id; // or another unique identifier
      if (!uniqueEvents.has(eventId)) {
        uniqueEvents.set(eventId, event);
      }
    });
  
    return Array.from(uniqueEvents.values());
  };
  
  const uniqueEvents = removeDuplicates(calendarEvents);

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
        events={uniqueEvents} // Pass unique events to FullCalendar
      />
    </div>
  );
}

export default Calendar;
