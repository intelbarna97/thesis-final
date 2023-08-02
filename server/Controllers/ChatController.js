import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const exists = await ChatModel.find({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (exists.length === 0) {
      const result = await newChat.save();
      res.status(200).json(result);
    } else {
      res.status(400).json("already exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
