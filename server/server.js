import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.route.js";

// app config
const app = express();

const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);

app.listen(PORT, () => {
  console.log("Server started !!!");
});
