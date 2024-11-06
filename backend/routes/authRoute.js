const express = require("express");
const router = express.Router();

const {login,register,addTeacher,addStudent} = require("../controllers/authController");
const requireAuth = require("../middleware/requireAuth");

router.post("/login",login);
router.post("/register",register);
router.post("/addTeacher",requireAuth,addTeacher);
router.post("/addStudent",requireAuth,addStudent);

module.exports = router;