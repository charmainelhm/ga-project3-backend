// Defining schema for video
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    thumbnail:{
      type: String, 
      required: true,
    },
    youtubeId:{
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

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;