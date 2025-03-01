const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    questionText: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
