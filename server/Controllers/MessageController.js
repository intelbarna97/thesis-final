import MessageModel from "../Models/MessageModel.js";

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId: chatId,
    senderId: senderId,
    text: text,
  });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await MessageModel.find({ chatId: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
