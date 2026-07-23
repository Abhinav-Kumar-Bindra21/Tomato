import express from "express";
import multer from "multer";
import { addFood } from "../controllers/food.controller.js";

const foodRouter = express.Router();
console.log("mutter before");

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);

console.log("Multte after");
export default foodRouter;
