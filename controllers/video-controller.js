const { Video } = require("../models");
const { createError } = require("../utils/error");

const createVideo = async (req, res, next) => {
  if (req.user.isAdmin) {
    const newVideo = new Video({ ...req.body });
    try {
      const video = await newVideo.save();
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not authorised to add video!"));
  }
};

const findAllVideos = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const videos = await Video.find();
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not authorised to access the data!"));
  }
};
const findVideo = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not authorised to access the data!"));
  }
};

module.exports = {
  createVideo,
  findAllVideos,
  findVideo,
};
