// client/src/components/TextSummarizer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import "./TextSummarizer.css";

const TextSummarizer = () => {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    // Enhanced cleanText function
    const cleanText = (text) => {
        return text
            .replace(/�/g, " ")  // Replace invalid characters
            .replace(/([a-z])([A-Z])/g, "$1 $2")  // Add space between joined words
            .replace(/(\d)([A-Za-z])/g, "$1 $2") // Space between number and letter
            .replace(/([a-zA-Z])(\d)/g, "$1 $2") // Space between letter and number
            .replace(/\s+/g, " ")                // Remove extra spaces
            .trim();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Upload and summarize
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file");
            return;
        }

        setLoading(true);
        setSummary("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:5000/api/summarize", formData);

            // Clean and split the summary
            const formattedSummary = cleanText(response.data)
                .split(/(?<=[.?!])\s+/) // Split by sentence-ending punctuation
                .filter(Boolean);       // Remove empty entries

            setSummary(formattedSummary);
        } catch (error) {
            console.error(error);
            setSummary(["Failed to summarize. Try again."]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="summarizer-container">
            <h2 className="title">Text Summarizer</h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                accept=".pdf"
            />
            <button onClick={handleUpload} className="upload-button" disabled={loading}>
                {loading ? "Processing..." : "Upload & Summarize"}
            </button>

            {loading && (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )}

            {summary.length > 0 && (
                <div className="summary-box">
                    <h3>Summary:</h3>
                    {summary.map((sentence, index) => (
                        <p key={index} className="summary-paragraph">{sentence}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TextSummarizer;
