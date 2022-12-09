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

module.exports = {
  createVideo,
};
