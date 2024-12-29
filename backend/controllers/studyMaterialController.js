const StudyMaterial = require("../models/StudyMaterialModel");

// Fetch distinct departments
const getDepartments = async (req, res) => {
    try {
        const departments = await StudyMaterial.distinct("department");
        res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch distinct subjects for a department
const getSubjects = async (req, res) => {
    const { department } = req.query;
    try {
        const subjects = await StudyMaterial.find({ department }).distinct("subject");
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch distinct topics for a subject in a department
const getTopics = async (req, res) => {
    const { department, subject } = req.query;
    console.log("entering topics : ",department,subject)
    try {
        const topics = await StudyMaterial.findOne({ department, subject }).distinct("materials.topicName");
        console.log(topics)
        res.status(200).json(topics);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch materials for a topic within a subject and department
const getStudyMaterials = async (req, res) => {
    const { department, subject, topic } = req.query;
    try {
        const studyMaterial = await StudyMaterial.findOne({ department, subject });
        if (studyMaterial) {
            const topicMaterials = studyMaterial.materials.filter((material) => material.topic === topic);
            res.status(200).json(topicMaterials);
        } else {
            res.status(404).json({ message: "No materials found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add materials under a specific topic for a subject in a department
const addStudyMaterial = async (req, res) => {
    const { department, subject, topic, materials } = req.body;
    try {
        let studyMaterial = await StudyMaterial.findOne({ department, subject });

        if (studyMaterial) {
            // Check if topic exists, if not create it
            const topicExists = studyMaterial.materials.some((material) => material.topic === topic);
            if (topicExists) {
                // Append materials to the existing topic
                studyMaterial.materials = studyMaterial.materials.map((material) => {
                    if (material.topic === topic) {
                        return { ...material, files: [...material.files, ...materials] };
                    }
                    return material;
                });
            } else {
                // Add new topic with materials
                studyMaterial.materials.push({ topic, files: materials });
            }
            await studyMaterial.save();
        } else {
            // Create a new document with the department, subject, and topic
            studyMaterial = new StudyMaterial({
                department,
                subject,
                materials: [{ topic, files: materials }],
            });
            await studyMaterial.save();
        }

        res.status(201).json(studyMaterial);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getDepartments,
    getSubjects,
    getTopics,
    getStudyMaterials,
    addStudyMaterial,
};
