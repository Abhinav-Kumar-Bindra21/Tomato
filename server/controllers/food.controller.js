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

export const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});

    if (!foods) {
      res.status(400).json({ success: "false", message: "No item is present" });
    }
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(400).json({ success: "false", message: "Failed to fetch foods" });
  }
};

export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    const food = await FoodModel.findById(id);

    if (!food) {
      res.status(400).json({ success: "false", message: "Food is not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});

    await FoodModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food removed" });
  } catch (error) {
    res.status(400).json({ success: "false", message: "Failed to remove food" });
  }
};
