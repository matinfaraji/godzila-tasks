import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  taskId?: string; // Add taskId prop to identify the task to edit
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, taskId } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [important, setImportant] = useState(false);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskId) {
      // Fetch the task data when the dialog opens
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/tasks/${taskId}`);
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setDate(task.date);
          setImportant(task.important);
          setStatus(task.status);
        } catch (err) {
          setError("Failed to fetch task data. Please try again.");
        }
      };

      fetchTask();
    }
  }, [taskId]);

  const handleSubmit = async () => {
    if (!title || !description) {
      setError("Title and Description are required.");
      return;
    }

    setError("");
    const formData = {
      title,
      description,
      date,
      important,
      status,
    };

    setLoading(true);
    try {
      if (taskId) {
        // Update the task if taskId is provided
        const response = await axios.put(`http://localhost:3000/tasks/${taskId}`, formData);
        console.log("Task updated:", response.data);
      } else {
        // Create a new task if taskId is not provided
        const response = await axios.post("http://localhost:3000/tasks", formData);
        console.log("Task created:", response.data);
      }
      onClose("submit");
    } catch (err) {
      setError("Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onClose={() => onClose("cancel")} open={open}>
      <DialogTitle>{taskId ? "Edit Task" : "Enter Details"}</DialogTitle>
      <div style={{ padding: "20px" }}>
        <TextField
          id="input1"
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!title && !!error}
          helperText={!title && !!error ? "Title is required." : ""}
        />
        <TextField
          id="input2"
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!description && !!error}
          helperText={!description && !!error ? "Description is required." : ""}
        />
        <TextField
          id="date"
          label="Choose a date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="important"
              checked={important}
              onChange={(e) => setImportant(e.target.checked)}
            />
          }
          label="Important"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="status"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          }
          label="Status"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [taskId, setTaskId] = React.useState<string | undefined>(undefined);

  const handleClickOpen = (id?: string) => {
    setTaskId(id);
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    console.log("Submitted:", value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => handleClickOpen()}>
        Create Task
      </Button>
      <Button variant="outlined" onClick={() => handleClickOpen("task-id")}>
        Edit Task
      </Button>
      <SimpleDialog open={open} onClose={handleClose} taskId={taskId} />
    </div>
  );
}
