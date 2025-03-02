import React, { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import '../Questions/Questions.css'
import { useAuthContext } from "../../hooks/useAuthContext";

const Questions = () => {

    const { user } = useAuthContext();

    const [subjects, setSubjects] = useState([]);
    const [topics, setTopics] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");
    
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentText, setCommentText] = useState("");

    const [expandedComments, setExpandedComments] = useState({});
    const [expandedReplies, setExpandedReplies] = useState({});

    const userId = "USER_ID_HERE"; // Replace with actual user ID

    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    const toggleCommentBox = () => {
        setShowCommentBox(!showCommentBox);
        setCommentText(""); // Clear text when closing
    };
    
    // Fetch subjects
    useEffect(() => {
        axios.get("http://localhost:5000/api/questions/subjects")
            .then(res => setSubjects(res.data))
            .catch(err => console.error("Error fetching subjects:", err));
    }, []);

    // Fetch topics when a subject is selected
    useEffect(() => {
        if (selectedSubject) {
            axios.get(`http://localhost:5000/api/questions/topics?subject=${selectedSubject}`)
                .then(res => setTopics(res.data))
                .catch(err => console.error("Error fetching topics:", err));
        } else {
            setTopics([]);
        }
    }, [selectedSubject]);

    // Fetch questions when a topic is selected
    useEffect(() => {
        if (selectedTopic) {
            axios.get(`http://localhost:5000/api/questions?subject=${selectedSubject}&topic=${selectedTopic}`)
                .then(res => {setQuestions(res.data)})
                .catch(err => console.error("Error fetching questions:", err));
        } else {
            setQuestions([]);
        }
    }, [selectedTopic]);


    // Toggle function for comments
    const toggleComments = (questionId) => {
        setExpandedComments((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    // Toggle function for replies
    const toggleReplies = (commentId) => {
        setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    // Handle posting a question
    const handlePostQuestion = () => {
        if (!newQuestion.trim() || !selectedSubject || !selectedTopic) return;

        axios.post("http://localhost:5000/api/questions/post", {
            subject: selectedSubject,
            topic: selectedTopic,
            questionText: newQuestion
        }, config)
            .then(res => {
                setQuestions([...questions, res.data]);
                setNewQuestion("");
                setIsPostModalOpen(false); // Close modal after posting
            })
            .catch(err => console.error("Error posting question:", err));
    };

    // Handle comment submission
    const handleComment = async (qid,text,parentCommentId) => {
        if (!commentText.trim()) return;
        const addedComment = axios.post("http://localhost:5000/api/questions/comment", {
            questionId: qid,
            text: text,
            parentCommentId: parentCommentId
        }, config)
        .then(res=>console.log(res.data))
        .catch(err => console.error("Error posting comment:", err));

        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question._id === qid
                    ? {
                        ...question,
                        comments: [...(question.comments || []), addedComment] // Ensure comments exist
                    }
                    : question
            )   
        );


        setCommentText("");
        setShowCommentBox(false);
    };

    const handleVote = async (id, type, voteType) => {
        try {
            axios.post(`http://localhost:5000/api/questions/voting?id=${id}&type=${type}&voteType=${voteType}`, {}, config)
                .then(res => {
                    const updatedQuestions = questions.map(q => {
                        if (type === "question" && q._id === id) {
                            return { ...q, upvotes: res.data.upvotes, downvotes: res.data.downvotes };
                        }
                        if (type === "comment") {
                            return {
                                ...q,
                                comments: q.comments.map(comment =>
                                    comment._id === id
                                        ? { ...comment, upvotes: res.data.upvotes, downvotes: res.data.downvotes }
                                        : {
                                            ...comment,
                                            replies: comment.replies.map(reply =>
                                                reply._id === id
                                                    ? { ...reply, upvotes: res.data.upvotes, downvotes: res.data.downvotes }
                                                    : reply
                                            )
                                        }
                                )
                            };
                        }
                        return q;
                    });

                    setQuestions(updatedQuestions);
                })
                .catch(err => console.error("Error in voting:", err));
        } catch (error) {
            console.error("Error while voting:", error);
        }
    };

    


    return (
        <div className="QA-container">
            <div className="QA-header-container">
                <button className="QA-post-btn" onClick={() => setIsPostModalOpen(true)}>Write a Post</button>
            </div>
            <h1 className="QA-header">Q&A Forum</h1>

            <div className="QA-dropdowns">
                <Select
                    className="QA-select"
                    placeholder="Select Subject"
                    options={subjects.map(sub => ({ value: sub, label: sub }))}
                    onChange={(option) => {
                        setSelectedSubject(option.value);
                        setSelectedTopic(null);
                    }}
                />
                <Select
                    className="QA-select"
                    placeholder="Select Topic"
                    options={topics.map(topic => ({ value: topic, label: topic }))}
                    isDisabled={!selectedSubject}
                    onChange={(option) => setSelectedTopic(option.value)}
                />
            </div>

            <input
                type="text"
                className="QA-search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="QA-questions">
                {questions
                    .filter(q => q.questionText.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(q => (
                        <div key={q._id} className="QA-question">
                            {/* Question */}
                            <p className="QA-question-text">
                                <strong>➥ {q.questionText}</strong>
                            </p>
                            <div className="QA-meta">
                                <button onClick={() => handleVote(q._id, "question", "upvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ display: "inline-block", fontSize: "18px", color: "#ffffff", background: "#2ccc00", borderRadius: "5px", padding: "1px 10px" }}>⇧</span>
                                    {q.upvotes.length}
                                </button>

                                <button onClick={() => handleVote(q._id, "question", "downvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <span style={{ display: "inline-block", fontSize: "18px", color: "#ffffff", background: "red", borderRadius: "5px", padding: "1px 10px" }}>⇩</span>
                                    {q.downvotes.length}
                                </button>
                                <button  onClick={() => {setShowCommentBox(!showCommentBox);setSelectedComment(q._id)}} style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft:"1rem" }}>
                                    <FaRegComment size={32} style={{ backgroundColor: "white", borderRadius: "50%", padding: "4px" }} />{q.comments.length}
                                </button>
                                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>Posted by {q.user?.name || "unknown"} - {new Date(q.updatedAt).toLocaleString()}</span>        
                            </div>
                            
                            {(showCommentBox && q._id === selectedComment) && (
                                <div className="comment-box">
                                    <textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Write a comment...."
                                    />
                                    <div className="comment-actions">
                                        <button onClick={() => handleComment(q._id, commentText, null)} className="post-btn">Post</button>
                                        <button onClick={toggleCommentBox} className="cancel-btn">Cancel</button>
                                    </div>
                                </div>
                            )}
                            <button className="QA-toggle-btn" onClick={() => toggleComments(q._id)}>
                                {expandedComments[q._id] ?
                                    (<p>Hide Comments <span style={{ fontSize: "20px" }}>▴</span></p>)
                                    : (<p>Show Comments <span style={{ fontSize: "20px" }}>▾</span></p>)}
                            </button>

                            {/* Comment Section */}
                            {expandedComments[q._id] && (
                                <div className="QA-comments">
                                    {q.comments.map(comment => (
                                        <div key={comment._id} className="QA-comment">
                                            {/* Main Comment */}
                                            <p className="QA-comment-text"> ↪ {comment.text}</p>
                                            <div className="QA-meta">
                                                <button onClick={() => handleVote(comment._id,"comment", "upvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <span style={{ display: "inline-block", fontSize: "16px", color: "#ffffff", background: "#2ccc00", borderRadius: "5px", padding: "1px 10px" }}>⇧</span>
                                                    {comment.upvotes.length}
                                                </button>
                                                <button onClick={() => handleVote(comment._id,"comment", "downvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <span style={{ display: "inline-block", fontSize: "16px", color: "#ffffff", background: "red", borderRadius: "5px", padding: "1px 10px" }}>⇩</span>
                                                    {comment.downvotes.length}
                                                </button>
                                                <button onClick={() => { setShowCommentBox(!showCommentBox); setSelectedComment(comment._id) }} style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "1rem" }}>
                                                    <FaRegComment size={32} style={{ backgroundColor: "white", borderRadius: "50%", padding: "4px" }} />{comment.replies.length}
                                                </button>
                                                <span>{comment.user?.name || "unknown"} - {new Date(comment.updatedAt).toLocaleString()}</span>
                                            </div>
                                            {(showCommentBox && comment._id === selectedComment) && (
                                                <div className="comment-box">
                                                    <textarea
                                                        value={commentText}
                                                        onChange={(e) => setCommentText(e.target.value)}
                                                        placeholder="Write a comment...."
                                                    />
                                                    <div className="comment-actions">
                                                        <button onClick={() => handleComment(q._id, commentText, null)} className="post-btn">Post</button>
                                                        <button onClick={toggleCommentBox} className="cancel-btn">Cancel</button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Toggle Replies */}
                                            {comment.replies.length > 0 && (
                                                <button className="QA-toggle-btn" onClick={() => toggleReplies(comment._id)}>
                                                    {expandedReplies[comment._id] ?
                                                        (<p>Hide Replies <span style={{ fontSize: "20px" }}>▴</span></p>)
                                                        : (<p>Show Replies <span style={{ fontSize: "20px" }}>▾</span></p>)
                                                    }
                                                </button>
                                            )}

                                            {/* Replies (Indented) */}
                                            {expandedReplies[comment._id] && (
                                                <div className="QA-replies">
                                                    {comment.replies.map(reply => (
                                                        <div key={reply._id} className="QA-reply">
                                                            <p className="QA-reply-text"> ⤷ {reply.text}</p>
                                                            <div className="QA-meta">
                                                                <button onClick={() => handleVote(reply._id, "comment", "upvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                    <span style={{ display: "inline-block", fontSize: "15px", color: "#ffffff", background: "#2ccc00", borderRadius: "5px", padding: "1px 10px" }}>⇧</span>
                                                                    {reply.upvotes.length}
                                                                </button>
                                                                <button onClick={() => handleVote(reply._id,"comment", "downvote")} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                                    <span style={{ display: "inline-block", fontSize: "15px", color: "#ffffff", background: "red", borderRadius: "5px", padding: "1px 10px" }}>⇩</span>
                                                                    {reply.downvotes.length}
                                                                </button>
                                                                <button onClick={() => { setShowCommentBox(!showCommentBox); setSelectedComment(reply._id) }} style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "1rem" }}>
                                                                    <FaRegComment size={32} style={{ backgroundColor: "white", borderRadius: "50%", padding: "4px" }} />{q.comments.length}
                                                                </button>
                                                                <span>{reply.user?.name || "unknown"} - {new Date(reply.updatedAt).toLocaleString()}</span>
                                                            </div>
                                                            {(showCommentBox && reply._id === selectedComment) && (
                                                                <div className="comment-box">
                                                                    <textarea
                                                                        value={commentText}
                                                                        onChange={(e) => setCommentText(e.target.value)}
                                                                        placeholder="Write a comment...."
                                                                    />
                                                                    <div className="comment-actions">
                                                                        <button onClick={() => handleComment(q._id, commentText, null)} className="post-btn">Post</button>
                                                                        <button onClick={toggleCommentBox} className="cancel-btn">Cancel</button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>


            {/* Post Question Modal */}
            {isPostModalOpen && (
                <div className="QA-modal">
                    <div className="QA-modal-content">
                        <h2>Write a Post</h2>
                        <Select
                            className="QA-select"
                            placeholder="Select Subject"
                            options={subjects.map(sub => ({ value: sub, label: sub }))}
                            onChange={(option) => {
                                setSelectedSubject(option.value);
                                setSelectedTopic(null);
                            }}
                        />
                        <br />
                        <Select
                            className="QA-select"
                            placeholder="Select Topic"
                            options={topics.map(topic => ({ value: topic, label: topic }))}
                            isDisabled={!selectedSubject}
                            onChange={(option) => setSelectedTopic(option.value)}
                        />
                        <textarea
                            className="QA-textarea"
                            placeholder="Ask a question..."
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <div className="QA-modal-buttons">
                            <button className="QA-cancel-btn" onClick={() => setIsPostModalOpen(false)}>Cancel</button>
                            <button className="QA-button" onClick={handlePostQuestion}>Post Question</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Questions;
