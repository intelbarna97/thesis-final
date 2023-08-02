import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";
import { notifyUser } from "../Controllers/UserController.js";
import TopicModel from "../Models/TopicModel.js";

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    if (newPost.desc === "") {
      res.status(403).json("Forbidden action");
    } else {
      await newPost.save();
      await topicChecker(newPost._id, newPost.desc);
      if (newPost.parent) {
        const parentPost = await PostModel.findById(newPost.parent);
        await notifyUser(parentPost.userId, newPost.userId, "comment");
      }
      res.status(200).json(newPost);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Forbidden action");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = PostModel.findById(id);
    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("Forbidden action");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      await notifyUser(post.userId, userId, "like");
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const userPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    const timelinePosts = userPosts
      .concat(...followingPosts[0].followingPosts)
      .sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    res.status(200).json(timelinePosts.slice(0, 500));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserPosts = async (req, res) => {
  const username = req.params.id;
  try {
    let user = await UserModel.find({ username: username }, { _id: 1 });
    const userId = user[0]._id.valueOf();
    const userPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      userPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
        .slice(0, 500)
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getComments = async (req, res) => {
  const id = req.params.id;

  try {
    const comments = await PostModel.find({ parent: id });
    res.status(200).json(
      comments.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateComments = async (req, res) => {
  const postId = req.params.id;
  const { commentId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post.comments.includes(commentId)) {
      await post.updateOne({ $push: { comments: commentId } });
      res.status(200).json("Comment added!");
    } else {
      res.status(400).json("Error!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const topicChecker = async (postId, description) => {
  try {
    description = description.split(" ");
    let topics = description.filter((x) => x.charAt(0) === "#" && x !== "#");
    let uniqueTopics = [];
    for (let i = 0; i < topics.length; i++) {
      let exists = false;
      for (let j = i + 1; j < topics.length; j++)
        if (topics[i] === topics[j]) {
          exists = true;
          break;
        }
      if (!exists) {
        uniqueTopics.push(topics[i]);
      }
    }
    for (const topic of uniqueTopics) {
      await TopicModel.updateOne(
        { name: topic },
        { $push: { posts: postId.toString() } },
        { upsert: true }
      );
      const newTopic = await TopicModel.findOne({ name: topic });
      await PostModel.updateOne(
        { _id: postId },
        { $push: { categories: newTopic._id.toString() } }
      );
    }
  } catch (error) {
    console.error();
  }
};

export const getTrendingTopics = async (req, res) => {
  try {
    const topics = await TopicModel.aggregate([
      {
        $project: {
          name: 1,
          numberOfTopics: { $size: "$posts" },
        },
      },
    ])
      .sort({ numberOfTopics: -1 })
      .limit(5);
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTopicPosts = async (req, res) => {
  const topicId = req.params.id;
  try {
    const topics = await PostModel.find({ categories: topicId });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const topicSearch = async (req, res) => {
  const searchParam = req.params.id;
  try {
    const topics = await TopicModel.aggregate([
      {
        $match: {
          name: new RegExp(".*" + searchParam + ".*"),
        },
      },
      { $project: { name: 1, numberOfTopics: { $size: "$posts" } } },
    ]);
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json(error);
  }
};
