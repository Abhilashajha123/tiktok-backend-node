import mongoose from "mongoose";

const tiktokShema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  message: String,
  description: String,
  shares: String,
});

export default mongoose.model("tiktokVideos", tiktokShema);
