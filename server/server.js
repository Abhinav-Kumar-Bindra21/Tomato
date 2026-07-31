import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";

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
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log("Server started !!!");
});
