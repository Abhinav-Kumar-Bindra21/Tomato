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
      amount: req.body.ammount,
      address: req.body.address,
    });

    await newOrder.save();

    await Order.findByIdAndUpdate(req.user, { cartData: {} });

    const lineItems = req.body.items.map((item) => ({
      priceData: {
        currency: "inr",
        productData: {
          name: item.name,
        },
        unitAmount: item.price * 100 * 95,
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      priceData: {
        currency: "inr",
        productData: {
          name: "Delivery Charges",
        },

        unitAmount: 2 * 100 * 95,
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
    res.status(400).json({ success: false, message: "Error in payment " });
  }
};
