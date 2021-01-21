import express from "express";
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, protectAdminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, protectAdminRoute, getOrders);

router.route("/myorders").get(protect, getUserOrders);

router.route("/:id").get(protect, getOrderByID);

router.route("/:id/pay").put(protect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, protectAdminRoute, updateOrderToDelivered);

export default router;
