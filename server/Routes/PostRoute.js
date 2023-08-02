import express from "express";
import {
  createPost,
  getComments,
  getPost,
  getTimeLinePosts,
  getTopicPosts,
  getTrendingTopics,
  getUserPosts,
  likePost,
  topicSearch,
  updateComments,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimeLinePosts);
router.get("/:id/comments", getComments);
router.put("/:id/comments", updateComments);
router.get("/:id/user", getUserPosts);
router.get("/:id/topicposts", getTopicPosts);
router.get("/:id/trending", getTrendingTopics);
router.get("/:id/topicSearch", topicSearch);

export default router;
