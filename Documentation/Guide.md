# User Guide

1) The UI will be visible on the default browser of the computer once the `Getting Started` steps are completed.

2) At the top left is the Logo and Title of the application, and on the top right are header buttons for
    - Choose a Driver (Driver 1 is the default view of the application).
    - Adding New Tasks to the calendar.
    - Download Schedule in `*.csv` format and date ranges are set in 2, 4, 7, 14 and 28 days.

3) Right below the title and header buttons is the calendar where default schedules for each drivers will show up. Choose a Driver from the dropdown which will allow the dispatcher to focus on each drivers schedules separately.

4) Using the `Add New Task` button, a dispatcher can assign a new task to any specific driver. Once clicked on `Add New Task` button, a modal will pop up with these fields - `Title`, `Location`,  `Description`, `Driver`, `Task Type`, `Start Time`, `End Time`. *Note: As a task cannot be scheduled over multiple days, the previous and future dates of the selected Start date becomes disabled*.

5) Each existing and newly added tasks are clickable and are editable. The tasks can be deleted as well, using the `Delete` button on the Edit Task modal.

6) If a new task or new edit conflicts with an existing task for the same driver then an alert will inform that there is a conflict. The dispatcher then can choose to either cancel (`Cancel button`) the new task or can choose to overwrite (`Overwrite button`)the existing task with the new task.

7) Dispathcer can use the Download Schedule button from header to download a `.csv` file of a choosen driver. Initially the `Download CSV` is hidden and becomes active once the dispatcher chooses from 2, 4, 7, 14 and 28 day using `Download Schedule` dropdown. Clicking on the `Download CSV` file will download a `my-file.csv` file for the specified driver in the choosen date format.
