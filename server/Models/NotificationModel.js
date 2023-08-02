import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: String,
    seen: Boolean,
  },
  {
    timestamps: true,
  }
);

var NotificationModel = mongoose.model("Notifications", NotificationSchema);
export default NotificationModel;
