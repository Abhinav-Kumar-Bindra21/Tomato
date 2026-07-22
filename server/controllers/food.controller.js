import FoodModel from "../models/food.model.js";
import fs from "fs";

// add food item
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    let image_filename = `${req.file.filename}`;

    const food = new FoodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await food.save();

    res.status(200).json({ success: "true", message: "Food Added" });
  } catch (error) {
    console.log("Error in adding food", error);
    res.status(400).json({ success: "false", message: "Failed to add food item" });
  }
};
