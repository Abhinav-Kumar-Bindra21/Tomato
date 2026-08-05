import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { placeOrder, verifyOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", protectRoute, placeOrder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;
