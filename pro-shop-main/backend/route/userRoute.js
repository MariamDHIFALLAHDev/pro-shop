import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, protectAdminRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .get(protect, protectAdminRoute, getAllUsers);

router.route("/login").post(authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, protectAdminRoute, getUserById)
  .delete(protect, protectAdminRoute, deleteUser)
  .put(protect, protectAdminRoute, updateUser);

export default router;
