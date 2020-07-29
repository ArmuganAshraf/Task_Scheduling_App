import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// initially set moment locationzation to local time stamp
//https://momentjs.com/timezone/docs/#:~:text=Default%20time%20zone&text=setDefault(String)%3B,js%20server.
const localizer = momentLocalizer(moment);

export const CalendarView = ({ eventList, handleEventClick, handleSelectSlot }) => {
  return (
    <Calendar
      selectable={true}
      localizer={localizer}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800 }}
      defaultView={'week'}
      views= {[ 'week' ]}
      onSelectEvent={event => handleEventClick(event)}
      onSelectSlot={event => handleSelectSlot(event)}
    />
  );
}