import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    chatId: { type: String },
    senderId: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

var MessageModel = mongoose.model("Messages", MessageSchema);
export default MessageModel;
