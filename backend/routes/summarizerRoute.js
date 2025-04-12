// server/routes/summarizerRoute.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const { summarizeText } = require("../controllers/summarizerController");

const router = express.Router();

// Ensure upload directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save in backend/uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

// Correct route
router.post("/summarize", upload.single("file"), summarizeText);

    module.exports = router;
