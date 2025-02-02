const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth);
const {addYear} = require("../controllers/yearController");

router.post("/addYear",addYear);

module.exports = router;