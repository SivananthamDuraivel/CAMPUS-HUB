const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

const {
  addYear,
  getAllYears,
  getYearById,
  updateYear,
  deleteYear
} = require("../controllers/yearController");

router.post("/addYear", addYear);

router.get("/getAllYears/:departmentId", getAllYears);

router.get("/getYear/:yearId", getYearById);

router.put("/updateYear/:yearId", updateYear);

router.delete("/deleteYear/:yearId", deleteYear);

module.exports = router;
