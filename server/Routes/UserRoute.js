import express from "express";
import {
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser,
  getRecommendedUsers,
  userSearch,
  updateNotification,
  getNofitifactions,
} from "../Controllers/UserController.js";

import AuthMiddleware from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/recommended", getRecommendedUsers);
router.get("/:username/username", getUserByUsername);
router.put("/:id", AuthMiddleware, updateUser);
router.delete("/:id", AuthMiddleware, deleteUser);
router.put("/:id/follow", AuthMiddleware, followUser);
router.put("/:id/unfollow", AuthMiddleware, unFollowUser);
router.get("/:searchParam/search", userSearch);
router.put("/:id/notification", updateNotification);
router.get("/:id/notification", getNofitifactions);

export default router;
