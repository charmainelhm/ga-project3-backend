const express = require("express");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/user-controller");
const { verifyToken } = require("../utils/verifyToken.js");

router.get("/", (req, res) => {
  res.send("Testing user route");
});

// get user by id

// update user by id
router.put("/:id", verifyToken, updateUser);

// delete user by id
router.delete("/:id", verifyToken, deleteUser);

// add to user playlist

// remove from user playlist

module.exports = { router };
