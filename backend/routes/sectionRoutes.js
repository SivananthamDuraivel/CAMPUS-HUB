const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { addSection, getSections, getSection, updateSection, deleteSection } = require("../controllers/sectionController");
router.use(requireAuth);

router.post("/addSection", addSection);
router.get("/:yearId", getSections);
router.get("/getSection/:sectionId", getSection);  
router.patch("/update/:sectionId", updateSection);  
router.delete("/delete/:sectionId", deleteSection);  

module.exports = router;
