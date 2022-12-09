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
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

const getRandomVideo = async (req, res, next) => {
  try {
    let nextVideo = await Video.findById(req.params.id);
    const previousVideoId = nextVideo._id;
    while (previousVideoId === nextVideo._id) {
      nextVideo = await Video.aggregate([{ $sample: { size: 1 } }]);
    }
    res.status(200).json(nextVideo);
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      await Video.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not authorised to delete this user's account!") // if user is not update his/her own account or user is not an admin
    );
  }
};
module.exports = {
  createVideo,
  findAllVideos,
  findVideo,
  getRandomVideo,
  deleteVideo,
};
