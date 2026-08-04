import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { placeOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", protectRoute, placeOrder);

export default orderRouter;
