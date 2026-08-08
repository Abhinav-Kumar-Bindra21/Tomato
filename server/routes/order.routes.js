import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", protectRoute, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", protectRoute, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.put("/status", updateStatus);

export default orderRouter;
