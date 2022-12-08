const express = require("express");
const router = express.Router();
const { createUser, signin } = require("../controllers/auth-controller");

router.get("/", (req, res) => {
  res.send("Testing authentication route");
});

// Create a new user
router.post("/signup", createUser);
// Sign in
router.post("/signin", signin);
// Sign out

module.exports = { router };
