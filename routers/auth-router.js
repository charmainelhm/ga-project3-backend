const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/auth-controller");

router.get("/", (req, res) => {
  res.send("Testing authentication route");
});

// Create a new user
router.post("/signup", createUser);
// Sign in
// Sign out

module.exports = { router };
