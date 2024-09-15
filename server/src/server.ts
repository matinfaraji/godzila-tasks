import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const PORT: number | string = process.env.APP_PORT || 5000;
const DB_URL: string = process.env.URL || "your_default_db_url";

app.use("/", userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to database ✅");
  } catch (error) {
    console.error("Database connection failed ❌", error);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
