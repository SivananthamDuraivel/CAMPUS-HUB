const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

const {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require("../controllers/departmentController");

router.post("/addDept", addDepartment);

router.get("/getAllDepts", getAllDepartments);

router.get("/getDept/:departmentId", getDepartmentById);

router.put("/updateDept/:departmentId", updateDepartment);

router.delete("/deleteDept/:departmentId", deleteDepartment);

module.exports = router;
