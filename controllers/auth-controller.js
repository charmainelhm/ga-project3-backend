const { User } = require("../models");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");
const { createError } = require("../utils/error");

const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const user = new User({ ...req.body, password: hashedPassword });

    await user.save();
    res.status(httpStatus.OK).send("User succesfully created!");
  } catch (err) {
    const status = err.code === 11000 ? 409 : err.status;
    const message = err.code === 11000 ? "Email has been taken" : err.message;
    next(createError(status, message));
  }
};

module.exports = {
  createUser,
};
