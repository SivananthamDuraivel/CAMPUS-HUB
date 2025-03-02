const express = require("express");
const { getAllSubjects, getTopicsBySubject, createQuestion, getQuestions, voteQuestion } = require('../controllers/questionController');
const {createComment} =require("../controllers/commentController")
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/subjects", getAllSubjects)
router.get("/topics", getTopicsBySubject)
router.post("/post", requireAuth, createQuestion);
router.get("/", getQuestions);
router.post("/voting", requireAuth, voteQuestion);
router.post("/comment",requireAuth, createComment)

module.exports = router;
