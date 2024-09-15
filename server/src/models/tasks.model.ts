import { Schema, model, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  date: Date;
  description: string;
  directory: string;
  important: boolean;
  status: boolean;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String},
  date: { type: Date},
  description: { type: String },
  directory: { type: String },
  important: { type: Boolean },
  status: { type: Boolean },
});

const TasksModel = model<ITask>("AllTasks", TaskSchema);

export default TasksModel;
