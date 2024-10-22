import express from "express";
import {
  deleteUser,
  getUserDetails,
  login,
  logout,
  signUp,
  updateUserDetails,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/users", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/users/:id", getUserDetails);
router.put("/users/:id", updateUserDetails);
router.delete("/users/:id", deleteUser);

export default router;
