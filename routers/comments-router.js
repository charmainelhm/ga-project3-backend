const express = require("express");

const { addComment, deleteComment, getComments } = require('../controllers/comment-controller.js');
const { verifyToken } = require("../utils/verifyToken.js");

const router = express.Router();

router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)
router.get('/:videoId', getComments)

module.exports = { router };