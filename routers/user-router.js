const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  findUser,
  findAllUsers,
  addToUserPlaylist,
  removeFromUserPlaylist,
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
router.put("/playlist/add/:id", verifyToken, addToUserPlaylist);

// remove from user playlist
router.put("/playlist/remove/:id", verifyToken, removeFromUserPlaylist);

// retrieve user playlist

module.exports = { router };
