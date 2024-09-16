import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import {
  ViewHeadlineOutlined as ViewHeadlineOutlinedIcon,
  ViewComfy as ViewComfyIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  StarOutlineOutlined as StarOutlineOutlinedIcon,
} from "@mui/icons-material";
import SimpleDialogDemo from "./createTask";
import TaskDialog from "./edit-task";

interface Task {
  _id: number;
  title: string;
  date: string;
  description: string;
  directory: string;
  important: boolean;
  status: boolean;
}


const Cards: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const toggleImportant = async (id: number) => {
    const task = tasks.find((task) => task._id === id);
    if (!task) return;

    const updatedTask = { ...task, important: !task.important };

    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task importance", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h6">All tasks ({tasks.length} tasks)</Typography>
      <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
        <Box>
          <IconButton aria-label="List View">
            <ViewHeadlineOutlinedIcon />
          </IconButton>
          <IconButton aria-label="Grid View">
            <ViewComfyIcon />
          </IconButton>
        </Box>
        <Autocomplete
          id="task-filter"
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter tasks"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          options={[...new Set(tasks.map((task) => task.title))]}
          disableCloseOnSelect
        />
      </Box>
      <Grid container spacing={2} px={2} mt={2}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {task.title}
                </Typography>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  {task.description}
                </Typography>
                <Typography color="text.secondary">{task.date}</Typography>
              </CardContent>
              <hr />
              <CardActions>
                <Button size="small" onClick={() => toggleImportant(task._id)}>
                  {task.important ? "doiing" : "done"}
                </Button>
                <IconButton
                  onClick={() => handleDelete(task._id)}
                  aria-label="Delete Task"
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => toggleImportant(task._id)}
                  aria-label="Mark as Important"
                >
                  <StarOutlineOutlinedIcon
                    sx={{ color: task.important ? "red" : "darkgray" }}
                  />
                </IconButton>
              </CardActions>
              <TaskDialog key={task._id} taskc={task} />
            </Card>
          </Grid>
        ))}
        <Box my="auto">
          {" "}
          <SimpleDialogDemo />{" "}
        </Box>
      </Grid>
    </Box>
  );
};

export default Cards;
