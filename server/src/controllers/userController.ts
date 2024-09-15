import { Request, Response } from "express";
import TasksModel from "../models/tasks.model";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await TasksModel.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const result = await TasksModel.create({ ...data });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.taskId;
    const data = req.body;
    const updatedTask = await TasksModel.findByIdAndUpdate(taskId, data, {
      new: true,
    });

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId = req.params.taskId; 
    const deletedTask = await TasksModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
