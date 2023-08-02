import express from "express";
import {
  createChat,
  userChats,
} from "../Controllers/ChatController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/getChats/:userId", userChats);

export default router;
