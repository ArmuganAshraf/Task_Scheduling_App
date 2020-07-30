import React from "react";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";

/* Modal View for  Adding new Task */
export const AddModalView = ({
  showModal,
  handleCloseAddModal,
  handleFormSubmission,
  changeTaskTitle,
  changeTaskLocation,
  changeTaskDescription,
  driver,
  handleDriverSelect,
  taskType,
  handleTaskTypeSelect,
  taskStartDateTime,
  handleCalendarStartDateTimeChange,
  taskEndDateTime,
  handleCalendarEndDateTimeChange,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseAddModal}
      backdrop="static" // disable hiding modal by clicking outside
      keyboard={false} // disable hiding with key stroke
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmission}>
          <div className="form-group">
            <label htmlFor="task_name">Title</label>
            <input
              className="form-control"
              id="task_name"
              onChange={changeTaskTitle}
            />
            <label htmlFor="task_name">Location</label>
            <input
              className="form-control"
              id="task_location"
              onChange={changeTaskLocation}
            />
            <label htmlFor="task_name">Description</label>
            <input
              className="form-control"
              id="task_description"
              onChange={changeTaskDescription}
            />
          </div>
          <div className="modal_dropdown">
            <label className="modal_dropdown-label">Choose Driver :</label>

            <DropdownButton
              alignRight
              title={driver}
              id="driver"
              onSelect={handleDriverSelect}
            >
              <Dropdown.Item eventKey="Driver-1">Driver-1</Dropdown.Item>
              <Dropdown.Item eventKey="Driver-2">Driver-2</Dropdown.Item>
              <Dropdown.Item eventKey="Driver-3">Driver 3</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="modal_dropdown">
            <labe className="modal_dropdown-label">Task Type :</labe>
            <DropdownButton
              alignRight
              title={taskType}
              id="tasktype"
              onSelect={handleTaskTypeSelect}
            >
              <Dropdown.Item eventKey="Pick-Up">Pick-Up</Dropdown.Item>
              <Dropdown.Item eventKey="Drop-Off">Drop-Off</Dropdown.Item>
              <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="modal_dropdown">
            <div>
              <label>Start Time :</label>
              <DatePicker
                selected={taskStartDateTime}
                onChange={handleCalendarStartDateTimeChange}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>

            <div>
              <label>End Time :</label>
              <DatePicker
                selected={taskEndDateTime}
                onChange={handleCalendarEndDateTimeChange}
                minDate={taskStartDateTime}
                maxDate={taskStartDateTime}
                minTime={moment(taskStartDateTime).toDate()}
                maxTime={moment(taskStartDateTime).endOf("day").toDate()}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
          </div>
          <div className="form-group">
            <button className="form-control btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
