import Order from "../models/order.modal.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user,
      items: req.body.items,
      amount: req.body.ammount,
      address: req.body.address,
    });

    await newOrder.save();

    await Order.findByIdAndUpdate(req.user, { cartData: {} });

    const lineItems;
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
