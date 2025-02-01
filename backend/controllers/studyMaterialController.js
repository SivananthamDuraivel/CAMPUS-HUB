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

const getSubjects = async (req, res) => {
    const { department } = req.query;
    try {
        const result = await StudyMaterial.findOne({ department: department },{ "subjectList.subject": 1, _id: 0 });

        if (result) {
            const subjects = result.subjectList.map(item => item.subject);
            res.status(200).json(subjects); 
        } else {
            console.log("No subjects found for the specified department.");
            res.status(404).json({ message: "No subjects found for the specified department." });
        }
    } catch (err) {
        console.error("Error fetching subjects:", err);
        res.status(500).json({ error: err.message }); // Send error as response
    }
};


// Fetch distinct topics for a subject in a department
const getTopics = async (req, res) => {
    console.log("Entering topics");
    const { department, subject } = req.query;
    try {
        const result = await StudyMaterial.findOne({ department, "subjectList.subject": subject },{ "subjectList.$": 1 });
        if (result && result.subjectList.length > 0) {
            const topics = result.subjectList[0].materials.map(material => material.topicName);
            console.log("Topics:", topics);
            res.status(200).json(topics);
        } else {
            res.status(404).json({ message: "No topics found for the specified department and subject." });
        }
    } catch (err) {
        console.error("Error fetching topics:", err);
        res.status(500).json({ error: err.message });
    }
};


// Fetch materials within a department and subject
const getStudyMaterials = async (req, res) => {
    const { department, subject } = req.query;
    try {
        const result = await StudyMaterial.findOne({ department: department, "subjectList.subject": subject },{"subjectList.$": 1, _id: 0});
        if (result && result.subjectList.length > 0) {
            const topics = result.subjectList[0].materials.map(material => ({
                topicName: material.topicName,
                files: material.files.map(file => ({
                    name: file.name,
                    url: file.url
                }))
            }));
            res.status(200).json(topics);
        } else {
            res.status(404).json({ message: "No topics found for the specified department and subject." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addStudyMaterial = async (req, res) => {
    const { department, subject, topic, materials } = req.body;

    try {
        let studyMaterial = await StudyMaterial.findOne({ department });
        if (studyMaterial) {
            const subjectItem = studyMaterial.subjectList.find(item => item.subject === subject);
            if (subjectItem) {
                const topicItem = subjectItem.materials.find(material => material.topicName === topic);
                if (topicItem) {
                    topicItem.files = [...topicItem.files, ...materials];
                } else {
                    subjectItem.materials.push({ topicName: topic, files: materials });
                }
            } else {
                studyMaterial.subjectList.push({
                    subject,
                    materials: [{ topicName: topic, files: materials }]
                });
            }
            await studyMaterial.save();
            res.status(200).json(studyMaterial);
        } else {
            const newStudyMaterial = new StudyMaterial({
                department,
                subjectList: [
                    {
                        subject,
                        materials: [{ topicName: topic, files: materials }]
                    }
                ]
            });
            await newStudyMaterial.save();
            res.status(201).json(newStudyMaterial);
        }
    } catch (err) {
        console.error("Error adding study material:", err);
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
