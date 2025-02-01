const fs = require('fs');
const path = require('path');
const axios = require('axios');
const StudyMaterial = require('../models/StudyMaterialModel');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

exports.uploadFile = async (req, res) => {
    console.log("Entered uploadFile");
    const { department, subject, topic, fileName } = req.body;
    const file = req.file;
    console.log(department, subject, topic, fileName, file);

    if (!department || !subject || !topic || !fileName || !file) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const fileExtension = path.extname(file.originalname);
        const filePath = `uploads/${department}/${subject}/${topic}/${fileName}${fileExtension}`;

        const githubUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

        // Check if the file already exists
        try {
            const existingFileResponse = await axios.get(githubUrl, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
            });

            // If the file exists, return a message
            return res.status(409).json({
                message: "File already exists",
                fileUrl: existingFileResponse.data.html_url,
            });
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                throw error;
            }
        }

        const fileContent = fs.readFileSync(path.join(__dirname, '../uploads', file.filename), { encoding: 'base64' });

        const githubResponse = await axios.put(
            githubUrl,
            {
                message: `Upload ${file.filename} to ${filePath}`,
                content: fileContent,
                branch: GITHUB_BRANCH,
            },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const uploadedFileUrl = githubResponse.data.content.html_url;
        console.log("Uploaded File URL:", uploadedFileUrl);

        // Update the database with the uploaded file URL
        const newFile = { name: fileName, url: uploadedFileUrl };

        let studyMaterial = await StudyMaterial.findOne({ department });
        if (studyMaterial) {
            const subjectItem = studyMaterial.subjectList.find(item => item.subject === subject);
            if (subjectItem) {
                const topicItem = subjectItem.materials.find(material => material.topicName === topic);
                if (topicItem) {
                    topicItem.files.push(newFile); 
                } else {
                    subjectItem.materials.push({ topicName: topic, files: [newFile] }); // Add a new topic
                }
            } else {
                studyMaterial.subjectList.push({
                    subject,
                    materials: [{ topicName: topic, files: [newFile] }], 
                });
            }
            await studyMaterial.save();
        } else {
            const newStudyMaterial = new StudyMaterial({
                department,
                subjectList: [
                    {
                        subject,
                        materials: [{ topicName: topic, files: [newFile] }],
                    },
                ],
            });
            await newStudyMaterial.save();
        }
        console.log("uploaded and db updated")
        res.status(201).json({
            message: "File uploaded and database updated successfully",
            githubUrl: uploadedFileUrl,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
