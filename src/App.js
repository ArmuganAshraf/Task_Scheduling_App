import React, { useState } from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { CalendarView } from './Components/CalendarView';
import { AddModalView } from './Components/AddModalView';
import { EditModalView } from './Components/EditModalView';
import './App.css';
import { eachDayOfInterval } from 'date-fns';
import { CSVLink } from "react-csv";
import logo from './logo.png';

function App() {

  const [showEvent, setShowEvent] = useState(false);
  const handleCloseEditModal = () => {
    setShowEvent(false);
    setTaskIndex(-1);
  }
  const handleShowEditModal = () => setShowEvent(true);

  const [addEvent, setAddEvent] = useState(false);
  const handleCloseAddModal = () => setAddEvent(false);
  const handleShowAddModal = () => setAddEvent(true);

  const [errorModal, setErrorModal] = useState(false);
  const handleCloseErrorModal = () => setErrorModal(false);
  const handleShowErrorModal = () => setErrorModal(true);

  const [driver, setDriver] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskIndex, setTaskIndex] = useState(-1);

  const [selectedDriver, setSelectedDriver] = useState("Driver-1");

  const now = new Date();
  const milliseconds = new Date().getTime() + (1 * 60 * 60 * 1000);
  const later = new Date(milliseconds);

  const [taskStartDateTime, setTaskStartDateTime] = useState(now);
  const [taskEndDateTime, setTaskEndDateTime] = useState(later);

  const [countItem, setCountItem] = useState(4);

  const sampleCalendarEventList = [
    {
      id: 1,
      title: 'Task 1',
      location: 'Toronto',
      description: 'This is a pick up order',
      start: new Date('Jul 26, 2020 11:00:00'),
      end: new Date('Jul 26, 2020 12:00:00'),
      allDay: false,
      driver: "Driver-1",
      taskType: "Pick-Up",
    },
    {
      id: 2,
      title: 'Task 2',
      location: 'New York',
      description: 'This is a drop off order',
      start: new Date('Jul 26, 2020 9:00:00'),
      end: new Date('Jul 26, 2020 10:00:00'),
      allDay: false,
      driver: "Driver-1",
      taskType: "Drop-Off"
    },
    {
      id: 3,
      title: 'Task 3',
      location: 'Vancouver',
      description: 'This time is for lunch break',
      start: new Date('Jul 26, 2020 19:00:00'),
      end: new Date('Jul 26, 2020 20:00:00'),
      allDay: false,
      driver: "Driver-3",
      taskType: "Other"
    }
  ];

  const [eventList, setEventList] = useState(sampleCalendarEventList);
  const [csvList, setCsvList] = useState([]);

  //function gets called if an task slots gets clicked
  const handleEventClick = (event) => {
    console.log("Selected", event.start, event.end, event.id);
    handleShowEditModal();
    const eventIndex = eventList.findIndex(e => e.id === event.id);

    const task = eventList[eventIndex];
    console.log(task);
    setTaskTitle(task.title);
    setTaskLocation(task.location);
    setTaskDescription(task.description);
    setDriver(task.driver);
    setTaskType(task.taskType);
    setTaskStartDateTime(task.start);
    setTaskEndDateTime(task.end);
    setTaskIndex(eventIndex);
   
  }

  //function gets called if an empty slots gets double clicked
  const handleSelectSlot = (event) => {
    if(event.action === "doubleClick") {
      console.log("Selected slot", event.start, event.end);
    }  
  }

const addNewEvent = () => {
  console.log('Add New Event');
  handleShowAddModal();
}

const handleDriverSelect = (e) => {
  setDriver(e);
}

const handleTaskTypeSelect = (e) => {
  setTaskType(e);
}

const changeTaskTitle = (event) => {
  setTaskTitle(event.target.value);
}

const changeTaskLocation = (event) => {
  setTaskLocation(event.target.value);
}

const changeTaskDescription = (event) => {
  setTaskDescription(event.target.value);
}

const handleCalendarStartDateTimeChange = (date) => {
  setTaskStartDateTime(date);
  setTaskEndDateTime(moment(date).toDate());
}

const handleCalendarEndDateTimeChange = (date) => {
  setTaskEndDateTime(date);
}

const reset = () => {
  setDriver("");
  setTaskType("");
  setTaskTitle("");
  setTaskLocation("");
  setTaskDescription("");
  setTaskIndex(-1);

  const now = new Date();
  const milliseconds = new Date().getTime() + (1 * 60 * 60 * 1000);
  const later = new Date(milliseconds);

  setTaskStartDateTime(now);
  setTaskEndDateTime(later);

}

const deleteTask = (event) => {
  console.log(event.target);
  event.preventDefault();
  setEventList(eventList.filter((e, i) => {
    return i !== taskIndex
  }));
  reset();

  handleCloseEditModal();

}

const overwriteSubmission = (event) => {
  event.preventDefault();

  const conflictedIndex = eventList.findIndex((e, i) => e.driver === driver && i !== taskIndex && (moment(taskStartDateTime).isBetween(e['start'], e['end'], undefined, []) || moment(taskEndDateTime).isBetween(e['start'], e['end'], undefined, [])));
  console.log(conflictedIndex);

  const currentEvent = eventList[conflictedIndex];
  currentEvent['title'] = taskTitle;
  currentEvent['location'] = taskLocation;
  currentEvent['description'] = taskDescription;
  currentEvent['start'] = taskStartDateTime;
  currentEvent['end'] = taskEndDateTime;
  currentEvent['driver'] = driver;
  currentEvent['taskType'] = taskType;
 
  eventList[taskIndex] = currentEvent;
  setTaskIndex(-1);
  handleCloseEditModal();
  handleCloseErrorModal();
  handleCloseAddModal();

  reset();
}

const handleFormSubmission = (event) => {
  event.preventDefault();
  console.log(taskTitle);
  console.log(driver);
  console.log(taskType);
  console.log(taskStartDateTime);
  console.log(taskEndDateTime);

  const isStartDateConflicted = eventList.some((e, i) => e.driver === driver && i !== taskIndex && moment(taskStartDateTime).isBetween(e['start'], e['end'], undefined, []));
  const isEndDateConflicted = eventList.some((e, i) => e.driver === driver && i !== taskIndex && moment(taskEndDateTime).isBetween(e['start'], e['end'], undefined, []));
 
  console.log(isStartDateConflicted || isEndDateConflicted);
  console.log(isStartDateConflicted);
  console.log(isEndDateConflicted);

  if(isStartDateConflicted || isEndDateConflicted) {
    handleShowErrorModal(true);
    return;
  }

  if(taskIndex === -1) {
    const newEvent = {
      id: countItem,
      title: taskTitle,
      location: taskLocation,
      description: taskDescription,
      start: taskStartDateTime,
      end: taskEndDateTime,
      allDay: false,
      driver: driver,
      taskType: taskType
    };

    eventList.push(newEvent);
    setEventList(eventList);
    setCountItem(countItem + 1);
    handleCloseAddModal();
  }
  else {
    const currentEvent = eventList[taskIndex];
    currentEvent['title'] = taskTitle;
    currentEvent['location'] = taskLocation;
    currentEvent['description'] = taskDescription;
    currentEvent['start'] = taskStartDateTime;
    currentEvent['end'] = taskEndDateTime;
    currentEvent['driver'] = driver;
    currentEvent['taskType'] = taskType;
   
    eventList[taskIndex] = currentEvent;
    setTaskIndex(-1);
    handleCloseEditModal();
  }

  reset();
}

const filterDriverView = (driverName) => {
  setSelectedDriver(driverName);
}

const generateCSV = (scheduleDays) => {
  const days = Number.parseInt(scheduleDays, 10);
  const dayCols = eachDayOfInterval(
    {
      start: new Date(2020,0,1),
      end: new Date(2020,11,31)
    },
    {
      step: days
    });

    // console.log(dayCols);

    const csvArray = [];

    dayCols.forEach(intervalDay => {
      const endIntervalDate = moment(intervalDay).add(days, 'days');
      // console.log(endIntervalDate);

      const pickupTaskCount = eventList.filter(event =>
        event.driver === selectedDriver
        && event.taskType === "Pick-Up"
        && moment(event['start']).isBetween(intervalDay, moment(intervalDay).add(days, 'days'), undefined, '[)')
      ).length;

      const dropOffTaskCount = eventList.filter(event =>
        event.driver === selectedDriver
        && event.taskType === "Drop-Off"
        && moment(event['start']).isBetween(intervalDay, moment(intervalDay).add(days, 'days'), undefined, '[)')
      ).length;

      const otherTaskCount = eventList.filter(event =>
        event.driver === selectedDriver
        && event.taskType === "Other"
        && moment(event['start']).isBetween(intervalDay, moment(intervalDay).add(days, 'days'), undefined, '[)')
      ).length;

      const date = `Day ${moment(intervalDay).format('D')} - Day ${moment(endIntervalDate).format('D')}`;
      const row = [ date, pickupTaskCount, dropOffTaskCount, otherTaskCount];
      // const date = `Day ${moment(intervalDay).dayOfYear()} - Day ${moment(endIntervalDate).dayOfYear()}`;
      // const row = {
      //   date: date,
      //   pickupCount: pickupTaskCount,
      //   dropOffCount: dropOffTaskCount,
      //   OtherCount: otherTaskCount
      // }
      csvArray.push(row);
    });

    console.log(csvArray);
    setCsvList(csvArray);
}

  return (
    <>
    <div className="header">
      <div className="header_title">
        <h2>
        <img src={logo} alt="logo" width="60px"/>
          Work Schedule
        </h2>
      </div>
      <div className="header_options">
        <div className="driver">
          <label className="driver_label">Choose Driver :</label>
          <DropdownButton
            alignRight
            title={selectedDriver}
            id="driver"
            onSelect={filterDriverView}
            >
              <Dropdown.Item eventKey="Driver-1">Driver-1</Dropdown.Item>
              <Dropdown.Item eventKey="Driver-2">Driver-2</Dropdown.Item>
              <Dropdown.Item eventKey="Driver-3">Driver 3</Dropdown.Item>
          </DropdownButton>
        </div>

        <div className="driver_label2">
          <Button onClick={addNewEvent}>
            Add New Task
          </Button>
        </div>
        <div className="header_button">
          <div className="driver">
            <label className="driver_label">Download Schedule :</label>
            <DropdownButton
              alignRight
              //title={Download}
              id="day"
              onSelect={generateCSV}
              >
                <Dropdown.Item eventKey="2">Day 2</Dropdown.Item>
                <Dropdown.Item eventKey="4">Day 4</Dropdown.Item>
                <Dropdown.Item eventKey="7">Day 7</Dropdown.Item>
                <Dropdown.Item eventKey="14">Day 14</Dropdown.Item>
                <Dropdown.Item eventKey="28">Day 28</Dropdown.Item>
            </DropdownButton>
            {
              csvList.length > 0 ?
                <CSVLink
                  data={csvList}
                  filename={"my-file.csv"}
                  className="btn btn-primary"
                  target="_blank"
                >
                  Download CSV
                </CSVLink> : null
            }
           
          </div>
        </div>
      </div>
    </div>
     
    <div>
    <Modal
        show={errorModal}
        onHide={handleCloseErrorModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Conflict</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We have found a conflict. Please either overwrite the existing event or cancel the new one.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Go Back
          </Button>
          <Button variant="primary" onClick={overwriteSubmission}>Overwrite</Button>
        </Modal.Footer>
      </Modal>
    </div>
    <div>
    <EditModalView showModal={showEvent} handleCloseEditModal={handleCloseEditModal}
                   handleFormSubmission={handleFormSubmission} changeTaskTitle={changeTaskTitle}
                   changeTaskLocation={changeTaskLocation} changeTaskDescription={changeTaskDescription}
                   taskLocation={taskLocation} taskDescription={taskDescription}
                   driver={driver} handleDriverSelect={handleDriverSelect}
                   taskType={taskType} handleTaskTypeSelect={handleTaskTypeSelect}
                   taskStartDateTime={taskStartDateTime} handleCalendarStartDateTimeChange={handleCalendarStartDateTimeChange}
                   taskEndDateTime={taskEndDateTime} handleCalendarEndDateTimeChange={handleCalendarEndDateTimeChange}
                   deleteTask={deleteTask} taskTitle={taskTitle} />
    </div>
    <div>
      <AddModalView showModal={addEvent} handleCloseAddModal={handleCloseAddModal}
                 handleFormSubmission={handleFormSubmission} changeTaskTitle={changeTaskTitle}
                 changeTaskLocation={changeTaskLocation} changeTaskDescription={changeTaskDescription}
                 driver={driver} handleDriverSelect={handleDriverSelect}
                 taskType={taskType} handleTaskTypeSelect={handleTaskTypeSelect}
                 taskStartDateTime={taskStartDateTime} handleCalendarStartDateTimeChange={handleCalendarStartDateTimeChange}
                 taskEndDateTime={taskEndDateTime} handleCalendarEndDateTimeChange={handleCalendarEndDateTimeChange} />
    </div>
      <div>
        <CalendarView eventList={eventList.filter((task) => task.driver === selectedDriver)} handleEventClick={handleEventClick} handleSelectSlot={handleSelectSlot} />
      </div>
    </>
  );
}

export default App;
