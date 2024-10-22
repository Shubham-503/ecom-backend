import express from "express";
import {
  createOrder,
  getOrderDetails,
  getUserOrders,
} from "../controllers/order.controller.js";
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders/:id", getOrderDetails);
router.get("/users/:id/orders", getUserOrders);

export default router;
