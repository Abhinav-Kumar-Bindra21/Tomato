import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.use(protectRoute);

cartRouter.post("/add", addToCart);
cartRouter.delete("/remove", removeFromCart);
cartRouter.get("/get", getCart);

export default cartRouter;
