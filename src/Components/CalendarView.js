import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export const CalendarView = ({ eventList, handleEventClick }) => {
  return (
    <Calendar
      selectable={true}
      localizer={localizer}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800 }}
      defaultView={"week"}
      views={["week"]}
      onSelectEvent={(event) => handleEventClick(event)}
    />
  );
};
