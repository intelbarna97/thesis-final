import mongoose from "mongoose";

const TopicSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    posts: [],
  },
  {
    timestamps: true,
  }
);

var TopicModel = mongoose.model("Topics", TopicSchema);
export default TopicModel;
