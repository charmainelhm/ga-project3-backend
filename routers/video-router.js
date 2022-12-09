const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const { createVideo } = require("../controllers/video-controller");

router.get("/", (req, res) => {
  res.send("Testing video route");
});

router.post("/", verifyToken, createVideo);
module.exports = { router };
