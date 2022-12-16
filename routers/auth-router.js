const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/verifyToken");
const {
  createUser,
  signin,
  logout,
} = require("../controllers/auth-controller");

router.get("/", (req, res) => {
  res.send("Testing authentication route");
});

// Create a new user
router.post("/signup", createUser);
// Sign in
router.post("/signin", signin);
// Sign out
router.get("/logout", verifyToken, logout);

module.exports = { router };
