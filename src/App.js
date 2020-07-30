import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import moment from 'moment';
import { eachDayOfInterval } from 'date-fns';
import { CSVLink } from "react-csv";

import { CalendarView } from './Components/CalendarView';
import { AddModalView } from './Components/AddModalView';
import { EditModalView } from './Components/EditModalView';

import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import logo from './logo.png';

function App() {

  /* boolean value to hide or show Edit Modal */
  const [showEvent, setShowEvent] = useState(false);
  const handleCloseEditModal = () => {
    setShowEvent(false);
    setTaskIndex(-1); // set to -1 when no event is selected
  }
  const handleShowEditModal = () => setShowEvent(true);

  /* boolean value to hide or show Add Modal */
  const [addEvent, setAddEvent] = useState(false);
  const handleCloseAddModal = () => {
    setAddEvent(false);
    reset();
  }
  const handleShowAddModal = () => setAddEvent(true);

    /* boolean value to hide or show Error Modal when a conflict happens */
  const [errorModal, setErrorModal] = useState(false);
  const handleCloseErrorModal = () => setErrorModal(false);
  const handleShowErrorModal = () => setErrorModal(true);

  const [driver, setDriver] = useState(""); // hold Driver value from Modal
  const [taskType, setTaskType] = useState(""); // hold TaskType value from Modal
  const [taskTitle, setTaskTitle] = useState(""); // hold Task title value from Modal
  const [taskLocation, setTaskLocation] = useState(""); // hold Task Location value from Modal
  const [taskDescription, setTaskDescription] = useState(""); // hold Task Description value from Modal
  const [taskIndex, setTaskIndex] = useState(-1); // holds index of selected event

  const [selectedDriver, setSelectedDriver] = useState("Driver-1"); // hold Selected Driver from header

  /* default calendar Start time is current time and End time is one hour ahead in both Edit and Add Modal */
  const now = new Date();
  const milliseconds = new Date().getTime() + (1 * 60 * 60 * 1000);
  const later = new Date(milliseconds);

  const [taskStartDateTime, setTaskStartDateTime] = useState(now);
  const [taskEndDateTime, setTaskEndDateTime] = useState(later);

  const [countItem, setCountItem] = useState(10);
  const sampleCalendarEventList = [
    {
      id: 1,
      title: 'Task 1',
      location: 'Toronto',
      description: 'This is a pick up order',
      start: new Date('Aug 4, 2020 11:00:00'),
      end: new Date('Aug 4, 2020 12:00:00'),
      allDay: false,
      driver: "Driver-1",
      taskType: "Pick-Up",
    },
    {
      id: 2,
      title: 'Task 2',
      location: 'New York',
      description: 'This is a drop off order',
      start: new Date('Jul 31, 2020 9:00:00'),
      end: new Date('Jul 31, 2020 10:00:00'),
      allDay: false,
      driver: "Driver-1",
      taskType: "Drop-Off"
    },
    {
      id: 3,
      title: 'Task 3',
      location: 'Vancouver',
      description: 'This time is for lunch break',
      start: new Date('Jul 31, 2020 19:00:00'),
      end: new Date('Jul 31, 2020 20:00:00'),
      allDay: false,
      driver: "Driver-3",
      taskType: "Other"
    },
    {
      id: 4,
      title: 'Task 4',
      location: 'Nova Scotia',
      description: 'This is a pick up order',
      start: new Date('Jul 30, 2020 11:30:00'),
      end: new Date('Jul 30, 2020 12:30:00'),
      allDay: false,
      driver: "Driver-2",
      taskType: "Pick-Up",
    },
    {
      id: 5,
      title: 'Task 5',
      location: 'New York',
      description: 'This is a drop off order',
      start: new Date('Aug 5, 2020 8:30:00'),
      end: new Date('Aug 5, 2020 10:30:00'),
      allDay: false,
      driver: "Driver-1",
      taskType: "Drop-Off"
    },
    {
      id: 6,
      title: 'Task 6',
      location: 'Texas',
      description: 'This time is for lunch break',
      start: new Date('Aug 4, 2020 9:00:00'),
      end: new Date('Aug 4, 2020 10:30:00'),
      allDay: false,
      driver: "Driver-2",
      taskType: "Other"
    },
    {
      id: 7,
      title: 'Task 7',
      location: 'Calgary',
      description: 'This time is for lunch break',
      start: new Date('Aug 5, 2020 13:00:00'),
      end: new Date('Aug 5, 2020 14:30:00'),
      allDay: false,
      driver: "Driver-3",
      taskType: "Other"
    },
    {
      id: 8,
      title: 'Task 8',
      location: 'Downtown',
      description: 'This time is for lunch break',
      start: new Date('Aug 4, 2020 17:00:00'),
      end: new Date('Aug 4, 2020 18:00:00'),
      allDay: false,
      driver: "Driver-2",
      taskType: "Other"
    },
    {
      id: 9,
      title: 'Task 9',
      location: 'Texas',
      description: 'This time is for lunch break',
      start: new Date('Aug 4, 2020 9:00:00'),
      end: new Date('Aug 4, 2020 10:00:00'),
      allDay: false,
      driver: "Driver-3",
      taskType: "Other"
    }
  ];

  /* to hold the list of tasks */
  const [eventList, setEventList] = useState(sampleCalendarEventList);
  /* to hold the list of tasks to download for a specific driver */
  const [csvList, setCsvList] = useState([]);

  //function gets called if an task slots gets clicked
  const handleEventClick = (event) => {
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

  const addNewEvent = () => {
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

  /* whenever a Start Date has been choosen we populate End date and time with same date and time */
  const handleCalendarStartDateTimeChange = (date) => {
    setTaskStartDateTime(date);
    setTaskEndDateTime(moment(date).toDate());
  }

  const handleCalendarEndDateTimeChange = (date) => {
    setTaskEndDateTime(date);
  }

  /* clears up the state values so when a new event is selected, it does not contain previous informations */
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

  /* looks for the event and filter that event out */
  const deleteTask = (event) => {
    console.log(event.target);
    event.preventDefault();
    setEventList(eventList.filter((e, i) => {
      return i !== taskIndex
    }));
    reset();

    handleCloseEditModal();
  }

  /* Search for the specific task with driver name and is used isBetween to determine if the new 
    Start Date falls between the current tasks Start and End Date. And Same for End date as well.
    Once found, the existing event with new added or edited event 
  */
  const overwriteSubmission = (event) => {
    event.preventDefault();
    const conflictedIndex = eventList.findIndex((e, i) => e.driver === driver && i !== taskIndex && (moment(taskStartDateTime).isBetween(e['start'], e['end'], undefined, []) || moment(taskEndDateTime).isBetween(e['start'], e['end'], undefined, [])));

    let currentEvent = eventList[conflictedIndex];
    currentEvent['title'] = taskTitle;
    currentEvent['location'] = taskLocation;
    currentEvent['description'] = taskDescription;
    currentEvent['start'] = taskStartDateTime;
    currentEvent['end'] = taskEndDateTime;
    currentEvent['driver'] = driver;
    currentEvent['taskType'] = taskType;
  
    eventList[taskIndex] = currentEvent;
    if(taskIndex !== -1) {
      setEventList(eventList.filter((e, i) => {
        return i !== conflictedIndex
      }));
    }
    setTaskIndex(-1);
    handleCloseEditModal();
    handleCloseErrorModal();
    handleCloseAddModal();

    reset();
  }

  /* Looks for conflict and return immediately if found by setting error modal to true.
    If the taskIndex is populated thats mean its an Edit and we replace the task.
    If the taskIndex is populated with - 1, we add a new task in the list.
  */
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

      setEventList([...eventList, newEvent]);
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

  /* Generates Dates range using date-fns and then calculate task category count for each date ranges */
  const generateCSV = (scheduleDays) => {
    const days = Number.parseInt(scheduleDays, 10);

    /* eachDayOfInterval takes an Interval and step as an paramter and return the array of dates with the step distance.
      If we choose 2, it will return 01/01/2020, 03/01/2020, o5/01/2020, etc.
    */
    const dayCols = eachDayOfInterval(
      {
        start: new Date(2020,0,1),
        end: new Date(2020,11,31)
      },
      {
        step: days
      });

      const csvArray = [['Time Frame', 'Pick-Up', 'Drop-Off', 'Other']];
      setCsvList([]);

      /* for each generated Date, we calculate End Date and then look for an Task's Start Date to match and increase
        count of task type.
      */
      dayCols.forEach(intervalDay => {
        const endIntervalDate = moment(intervalDay).add(days, 'days');

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

        const date = `Day ${moment(intervalDay).dayOfYear()} - Day ${moment(endIntervalDate).dayOfYear()}`;
        const row = [ date, pickupTaskCount, dropOffTaskCount, otherTaskCount];
        csvArray.push(row);
      });

      setCsvList(csvArray);
  }

  return (
    <>
    <div className="header">
      <div className="header_title">
        <h2>
        <img src={logo} alt="logo" width="60px"/>
          Task Scheduling App
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
              csvList.length > 0 ? // if csvList is populated only then show the button as it will have data, otherwise an empty file will be download.
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
    <Modal //Error Modal
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
        <CalendarView eventList={eventList.filter((task) => task.driver === selectedDriver)} handleEventClick={handleEventClick} />
      </div>
    </>
  );
}

export default App;
