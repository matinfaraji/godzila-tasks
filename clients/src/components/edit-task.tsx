import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    TextField,
  } from "@mui/material";
  import axios from "axios";
  import * as React from "react";
  import { useState, useEffect } from "react";
  import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
  interface Task {
    _id: number;
    title: string;
    date: string;
    description: string;
    directory: string;
    important: boolean;
    status:boolean
  }
  
  interface UserDialogProps {
    TaskEdit: Task;
    onClose: (action?: string) => void;
    open: boolean;
  }
  
  export function UserDialog({ TaskEdit, onClose, open }: UserDialogProps) {
    const [task, setTask] = useState<Task>(TaskEdit);
    const [date, setDate] = useState<string>(formatDate(TaskEdit.date));
  
    useEffect(() => {
      setTask(TaskEdit);
      setDate(formatDate(TaskEdit.date));
    }, [TaskEdit]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    };
  
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = event.target.value;
      setDate(newDate);
      setTask((prevTask) => ({
        ...prevTask,
        date: newDate,
      }));
    };
  
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;
      setTask((prevTask) => ({
        ...prevTask,
        [id]: checked,
      }));
    };
  
    const handleSubmit = async () => {
      const taskId = TaskEdit._id;
      const updateTask = {
        title: task.title,
        date: task.date,
        description: task.description,
        directory: task.directory,
        important: task.important,
      };
      await axios.put(`http://localhost:3000/tasks/${taskId}`, updateTask);
      onClose("submit");
    };
    function formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; 
    }
  
    return (
      <Dialog onClose={() => onClose()} open={open}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={task.title}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={task.description}
            onChange={handleChange}
          />
          <TextField
            id="date"
            label="Choose a date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={handleDateChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="important"
                checked={task.important}
                onChange={handleCheckboxChange}
              />
            }
            label="Important"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="status"
                checked={task.status || false}
                onChange={handleCheckboxChange}
              />
            }
            label="Status"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  interface TaskDialogProps {
    taskc: Task;
  }
  
  export default function TaskDialog({ taskc }: TaskDialogProps) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div>
         <IconButton  onClick={handleClickOpen}>
          <EditTwoToneIcon/>
        </IconButton>
        <UserDialog TaskEdit={taskc} open={open} onClose={handleClose} />
      </div>
    );
  }
  