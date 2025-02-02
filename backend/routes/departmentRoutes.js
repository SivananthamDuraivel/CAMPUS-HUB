const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth);
const {addDepartment} = require("../controllers/departmentController");

router.post("/addDept",addDepartment);

module.exports = router;