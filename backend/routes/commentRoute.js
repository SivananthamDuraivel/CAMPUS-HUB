const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/", commentController.createComment);
router.post("/comments/:id/vote", commentController.voteComment);

module.exports = router;
