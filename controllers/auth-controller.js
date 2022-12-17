const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { createError } = require("../utils/error");
const { NO_CONTENT } = require("http-status");

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

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Invalid email address!"));

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword)
      return next(createError(400, "Email and password do not match!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    );
    const { password, ...returnedUserData } = user._doc;

    res.status(200).json({ ...returnedUserData, access_token: token });
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200)
    //   .json({...returnedUserData, access_token: token});
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        path: "/",
      })
      .json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  signin,
  logout,
};
