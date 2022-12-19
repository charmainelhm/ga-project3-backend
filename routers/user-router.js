const express = require("express");
const router = express.Router();
const {
  updateUser,
  deleteUser,
  findUser,
  findAllUsers,
  findUserPlaylist,
  addToUserPlaylist,
  removeFromUserPlaylist,
  retrieveUserInfo,
} = require("../controllers/user-controller");
const { verifyToken } = require("../utils/verifyToken.js");

router.get("/", verifyToken, findAllUsers);

// get user by id
router.get("/find/:id", findUser);

// retrieve own user information
router.get("/retrieve", verifyToken, retrieveUserInfo);

// update user by id
router.put("/:id", verifyToken, updateUser);

// delete user by id
router.delete("/:id", verifyToken, deleteUser);

// retrieve user playlist
router.get("/playlist", verifyToken, findUserPlaylist);

// add to user playlist
router.put("/playlist/add/:videoId", verifyToken, addToUserPlaylist);

// remove from user playlist
router.put("/playlist/remove/:videoId", verifyToken, removeFromUserPlaylist);

module.exports = { router };
