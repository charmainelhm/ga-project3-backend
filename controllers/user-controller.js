const { createError } = require("../utils/error");
const { User } = require("../models");

const findUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(
        403,
        "You are not authorised to retrieve this user's account!"
      )
    );
  }
};

const findAllUsers = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not authorised to retrieve all users' account!") // if user id do not match or if user is not an admin update will not be allowed
    );
  }
};

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      const { password, ...returnedUserData } = updatedUser._doc;

      res.status(200).json(returnedUserData);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not authorised to update this user's playlist!") //user can only add video to his/her own playlist
    );
  }
};
const addToUserPlaylist = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { playlist: req.body.videoId }, // prevents duplicated items in the array
        },
        { new: true }
      );

      const { password, ...returnedUserData } = updatedUser._doc;

      res.status(200).json(returnedUserData);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not authorised to update this user's playlist!") //user can only remove video from his/her own playlist
    );
  }
};
const removeFromUserPlaylist = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { playlist: req.body.videoId },
        },
        { new: true }
      );

      const { password, ...returnedUserData } = updatedUser._doc;

      res.status(200).json(returnedUserData);
    } catch (err) {
      next(err);
    }
  } else {
    return next(
      createError(403, "You are not authorised to update this user's account!") // if user is not update his/her own account or user is not an admin
    );
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

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
  updateUser,
  deleteUser,
  findUser,
  findAllUsers,
  addToUserPlaylist,
  removeFromUserPlaylist,
};
