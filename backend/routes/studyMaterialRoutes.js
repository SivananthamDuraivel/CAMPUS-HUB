const express = require("express");
const {getDepartments,getSubjects,getTopics,getStudyMaterials,addStudyMaterial,} = require("../controllers/studyMaterialController");

const router = express.Router();

router.get("/departments", getDepartments);
router.get("/subjects", getSubjects);
router.get("/topics",getTopics)
router.get("/study-materials", getStudyMaterials);
router.post("/study-materials", addStudyMaterial); // Admin feature

module.exports = router;
