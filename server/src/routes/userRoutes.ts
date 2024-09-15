import { Router } from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from "../controllers/userController";

const router = Router();
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

export default router;
