const express = require("express");
const {getUser} = require("../controllers/userControllers")
const requireAuth = require("../middleware/requireAuth")
const router = express.Router();
router.use(requireAuth);
router.get("/:email",getUser);

module.exports = router;