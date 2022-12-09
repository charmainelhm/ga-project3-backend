const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createVideo,
  findAllVideos,
  findVideo,
  getRandomVideo,
  deleteVideo,
} = require("../controllers/video-controller");

// add new video
router.post("/", verifyToken, createVideo);

// get all videos
router.get("/all", verifyToken, findAllVideos);

// get video by id
router.get("/find/:id", findVideo);

// get random video
router.get("/random/:id", getRandomVideo);

// delete video by id
router.delete("/:id", verifyToken, deleteVideo);

module.exports = { router };
