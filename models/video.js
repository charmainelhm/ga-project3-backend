// Defining schema for video
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    thumbnail: String,
    youtubeId: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
