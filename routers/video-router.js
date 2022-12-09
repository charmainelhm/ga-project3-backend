const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createVideo,
  findAllVideos,
  findVideo,
} = require("../controllers/video-controller");

// add new video
router.post("/", verifyToken, createVideo);

// get all videos
router.get("/", verifyToken, findAllVideos);

// get video by id
router.get("/:id", verifyToken, findVideo);
// get random video
// delete video by id

module.exports = { router };
