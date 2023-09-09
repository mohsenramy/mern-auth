import express from "express";
import {
  authenticateUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../../controllers/v1/user.controller.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/auth").post(authenticateUser);

router.route("/logout").post(logoutUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
