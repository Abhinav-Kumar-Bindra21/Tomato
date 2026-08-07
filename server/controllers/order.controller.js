import Order from "../models/order.modal.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend

export const placeOrder = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL;
  try {
    const newOrder = new Order({
      userId: req.user,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await Order.findByIdAndUpdate(req.user, { cartData: {} });

    // console.log(req.body);
    // console.log(req.body.items);
    console.log(Array.isArray(req.body.items));

    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 95,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },

        unit_amount: 2 * 100 * 95,
      },

      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(400).json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });

    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "User has no order Item",
      });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Listing orders for admin panel

export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders) {
      return res.status(400).json({ success: false, message: "No orders present" });
    }

    res.status(200).json({ success: true, data: orders, message: "Orders fetched successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
