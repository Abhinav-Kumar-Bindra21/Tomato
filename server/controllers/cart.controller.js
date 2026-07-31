// add to cart

import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user });

    if (!userData) {
      return res.status(400).json({ success: false, message: "Unauthorized User" });
    }

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.user, { cartData });

    res.status(201).json({ success: true, message: "Added to cart" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
// remove items from user cart

export const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.user);

    if (!userData) {
      return res.status(400).json({ success: false, message: "Unauthorized User" });
    }

    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await User.findByIdAndUpdate(req.user, { cartData });

    res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Item not remove from cart" });
  }
};

// get item from cart

export const getCart = async (req, res) => {
  try {
    const userData = await User.findById(req.user);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
