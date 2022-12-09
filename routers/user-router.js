const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  findUser,
  findAllUsers,
} = require("../controllers/user-controller");
const { verifyToken } = require("../utils/verifyToken.js");

router.get("/", verifyToken, findAllUsers);

// get user by id
router.get("/:id", verifyToken, findUser);

// update user by id
router.put("/:id", verifyToken, updateUser);

// delete user by id
router.delete("/:id", verifyToken, deleteUser);

// add to user playlist

// remove from user playlist

module.exports = { router };
