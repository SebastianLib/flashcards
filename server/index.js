import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/auth.route.js'

const app = express();
const port = 3000;
dotenv.config();
const router = express.Router();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});