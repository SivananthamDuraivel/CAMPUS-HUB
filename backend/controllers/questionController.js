const Question = require("../models/QuestionModel");
const User = require("../models/UserModel");
const StudyMaterial = require("../models/StudyMaterialModel");
const Comment = require("../models/CommentModel");

exports.getAllSubjects = async (req, res) => {
    try {
        const materials = await StudyMaterial.find();

        let subjects = new Set();
        materials.forEach(department => {
            department.subjectList.forEach(subject => {
                subjects.add(subject.subject);
            });
        });

        res.json([...subjects]); // Convert Set to Array before sending
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopicsBySubject = async (req, res) => {
    console.log("123")
    try {
        const { subject } = req.query;
        console.log("entering topics : ",subject)

        const materials = await StudyMaterial.find({
            "subjectList.subject": subject
        });

        let topics = new Set();
        materials.forEach(department => {
            department.subjectList.forEach(subj => {
                if (subj.subject === subject) {
                    subj.materials.forEach(material => {
                        topics.add(material.topicName);
                    });
                }
            });
        });

        res.json([...topics]); // Convert Set to Array before sending
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createQuestion = async (req, res) => {
    console.log("entering here", req.body)
    try {
        const { subject, topic, questionText } = req.body;

        if (!subject || !topic || !questionText.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newQuestion = new Question({
            subject,
            topic,
            questionText,
            user: req.user._id, // Store only the user ID
        });

        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(500).json({ message: "Error posting question", error: err.message });
    }
};

exports.getQuestions = async (req, res) => {
    console.log("Entering getQuestions");
    try {
        const { subject, topic } = req.query;

        let query = {};
        if (subject) query.subject = subject;
        if (topic) query.topic = topic;

        // console.log("Fetching questions with filters:", query);

        let questions = await Question.find(query)
            .populate("user", "name") // Populate question creator
            .populate({
                path: "comments",
                populate: [
                    { path: "user", select: "name" },  // Populate comment author
                    {
                        path: "replies",
                        populate: { path: "user", select: "name" }  // Populate replies and their authors
                    }
                ]
            });

        console.log("Populated Questions:", JSON.stringify(questions, null, 2));
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.voteQuestion = async (req, res) => {
    const { id, type, voteType } = req.query;
    console.log("input : ",id,type,voteType);
    console.log("user : ",req.user);
    const userId = req.user._id;
    console.log("user ID : ",userId)
    try {
        const Model = type === "question" ? Question : Comment;
        const item = await Model.findById(id);

        if (!item) return res.status(404).json({ message: "Item not found" });

        // Handle upvotes/downvotes
        const upvoteIndex = item.upvotes.indexOf(userId);
        const downvoteIndex = item.downvotes.indexOf(userId);

        if (voteType === "upvote") {
            if (upvoteIndex === -1) {
                item.upvotes.push(userId);
                if (downvoteIndex !== -1) item.downvotes.splice(downvoteIndex, 1);
            } else {
                item.upvotes.splice(upvoteIndex, 1);
            }
        } else {
            if (downvoteIndex === -1) {
                item.downvotes.push(userId);
                if (upvoteIndex !== -1) item.upvotes.splice(upvoteIndex, 1);
            } else {
                item.downvotes.splice(downvoteIndex, 1);
            }
        }

        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
};
