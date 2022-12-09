const { createError } = require("../utils/error");
const { User } = require("../models");

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

      res.status(200).json(updatedUser);
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
};
