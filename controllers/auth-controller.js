const { User } = require("../models");
const bcrypt = require("bcrypt");
const httpStatus = require("http-status");

const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const user = new User({ ...req.body, password: hashedPassword });

    await user.save();
    res.status(httpStatus.OK).send("User succesfully created!");
  } catch (err) {
    // res.send(err);
    const status = err.code === 11000 ? 409 : 500;
    const message =
      status === 409
        ? "Email has been taken"
        : "An error has occurred, please try again!";
    res.status(status).json({
      success: false,
      status,
      message,
    });
  }
};

module.exports = {
  createUser,
};
