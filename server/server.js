import express from "express";
import cors from "cors";
import "dotenv/config";

// app config
const app = express();

// middlewares
app.use(express.json);
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server started !!!");
});
