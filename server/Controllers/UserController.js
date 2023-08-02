import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import NotificationModel from "../Models/NotificationModel.js";

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRecommendedUsers = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      const unfollowed = otherDetails.followers.filter(
        (x) => !otherDetails.following.includes(x)
      );
      let recommended = [];
      for (let i = 0; i < 5 && i < unfollowed.length; i++) {
        recommended.push(unfollowed[i]);
      }
      if (recommended.length < 5) {
        const allUsers = await UserModel.find();
        const selectedUsers = allUsers.filter(
          (x) =>
            !otherDetails.followers.includes(x._id) &&
            !otherDetails.following.includes(x._id) &&
            x._id.toString() !== id
        );
        for (
          let i = 0;
          recommended.length < 5 && i < selectedUsers.length;
          i++
        ) {
          recommended.push(selectedUsers[i]._id.toString());
        }
      }
      res.status(200).json(recommended);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("User does not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    username,
    isAdmin,
    password,
    currentPassword,
    confirmPassword,
    currentHashedPassword,
    email,
  } = req.body;

  if (id === username || isAdmin) {
    try {
      let updateUser = {};

      if (
        password ||
        confirmPassword ||
        currentHashedPassword ||
        currentPassword ||
        email
      ) {
        const valid = await bcrypt.compare(
          currentPassword,
          currentHashedPassword
        );
        if (!valid) {
          res.status(400).json("Wrong password");
        } else {
          if (password && password !== "") {
            updateUser = {
              password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
              ...updateUser,
            };
          }
          if (email && email !== "") {
            updateUser = {
              email: email,
              ...updateUser,
            };
          }
        }
      } else {
        updateUser = req.body;
      }
      const user = await UserModel.findOneAndUpdate(
        { username: id },
        updateUser,
        {
          new: true,
        }
      );

      const token = JWT.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied");
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("Delete successful");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied");
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId == id) {
    req.status(403).json("Forbidden action");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        await notifyUser(id, currentUserId, "follow");
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User is already followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId == id) {
    req.status(403).json("Forbidden action");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed!");
      } else {
        res.status(403).json("User is not followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const userSearch = async (req, res) => {
  const searchParam = req.params.searchParam;
  try {
    const searchResult = await UserModel.find({
      $or: [
        { name: new RegExp(".*" + searchParam + ".*") },
        { username: new RegExp(".*" + searchParam + ".*") },
      ],
    });
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const notifyUser = async (userId, otherUserId, notificationType) => {
  let message;
  try {
    const otherUser = await UserModel.findById(otherUserId);
    switch (notificationType) {
      case "follow":
        message = otherUser.username + " has followed you.";
        break;
      case "like":
        message = otherUser.username + " has liked your post.";
        break;
      case "comment":
        message = otherUser.username + " has commented on your post.";
        break;
      default:
        message = "wrong type";
    }
    const exists = await NotificationModel.find({
      userId: userId,
      message: message,
    });
    if (exists.length === 0 || notificationType !== "follow") {
      const notification = new NotificationModel({
        userId: userId,
        message: message,
        seen: false,
      });
      await notification.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getNofitifactions = async (req, res) => {
  const id = req.params.id;
  try {
    const notifications = await NotificationModel.find({
      userId: id,
      seen: false,
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateNotification = async (req, res) => {
  const id = req.params.id;
  try {
    await NotificationModel.findByIdAndUpdate({ _id: id }, { seen: true });
  } catch (error) {
    console.error();
  }
};
