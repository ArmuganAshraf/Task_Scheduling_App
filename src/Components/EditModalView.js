import React from "react";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./Modal.css";

/* Modal View for  Edit and Deleting a Task */
export const EditModalView = ({
  showModal,
  handleCloseEditModal,
  handleFormSubmission,
  taskTitle,
  changeTaskTitle,
  taskLocation,
  taskDescription,
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
  deleteTask,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseEditModal}
      backdrop="static" // disable hiding modal by clicking outside
      keyboard={false} // disable hiding with key stroke
    >
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmission}>
          <div className="form-group">
            <label htmlFor="task_name">Title</label>
            <input
              className="form-control"
              id="task_name"
              value={taskTitle}
              onChange={changeTaskTitle}
            />
            <label htmlFor="task_name">Location</label>
            <input
              className="form-control"
              id="task_location"
              value={taskLocation}
              onChange={changeTaskLocation}
            />
            <label htmlFor="task_name">Description</label>
            <input
              className="form-control"
              id="task_description"
              value={taskDescription}
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
              <Dropdown.Item eventKey="Driver-1" selected>
                Driver-1
              </Dropdown.Item>
              <Dropdown.Item eventKey="Driver-2">Driver-2</Dropdown.Item>
              <Dropdown.Item eventKey="Driver-3">Driver 3</Dropdown.Item>
            </DropdownButton>
          </div>

          <div className="modal_dropdown">
            <label className="modal_dropdown-label">Task Type :</label>
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
            <label className="modal_dropdown-label">Start Time :</label>
            <DatePicker
              selected={taskStartDateTime}
              onChange={handleCalendarStartDateTimeChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          <div className="modal_dropdown">
            <label className="modal_dropdown-label">End Time :</label>
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

          <div className="form-group">
            <div className="modal_button">
              <button className="form-control btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>

            <button
              className="form-control btn btn-primary"
              type="button"
              onClick={deleteTask}
            >
              Delete Task
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
