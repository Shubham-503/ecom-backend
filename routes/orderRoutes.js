import express from "express";
import {
  createOrder,
  getOrderDetails,
  getUserOrders,
} from "../controllers/order.controller.js";
import { validateOrder } from "../middlewares/orderValidation.js";
const router = express.Router();

router.post("/orders", validateOrder, createOrder);
router.get("/orders/:id", validateOrder, getOrderDetails);
router.get("/users/:id/orders", validateOrder, getUserOrders);

export default router;
