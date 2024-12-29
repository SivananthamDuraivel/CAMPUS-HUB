const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/UploadFileController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
