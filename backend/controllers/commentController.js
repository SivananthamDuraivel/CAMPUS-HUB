const Comment = require("../models/CommentModel");
const Question = require("../models/QuestionModel");

exports.createComment = async (req, res) => {
    console.log("enteriung comment")
    try {
        console.log("Comment Body:", req.body);
        console.log("User:", req.user);

        const { questionId, text, parentCommentId } = req.body;
        const userId = req.user._id; // Get user ID from request

        // Create new comment
        const comment = new Comment({
            question: questionId,
            text,
            user: userId,
            parentComment: parentCommentId || null,
        });

        await comment.save();

        if (parentCommentId) {
            await Comment.findByIdAndUpdate(parentCommentId, { $push: { replies: comment._id } });
        } else {
            await Question.findByIdAndUpdate(questionId, { $push: { comments: comment._id } });
        }

        // Populate user details before sending response
        const populatedComment = await Comment.findById(comment._id).populate("user", "name");

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.voteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.body;
        const userId = req.user._id;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        // Handle upvote/downvote with proper set operations
        if (type === "upvote") {
            comment.upvotes.addToSet(userId);
            comment.downvotes.pull(userId); // Remove from downvotes if present
        } else if (type === "downvote") {
            comment.downvotes.addToSet(userId);
            comment.upvotes.pull(userId); // Remove from upvotes if present
        }

        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
