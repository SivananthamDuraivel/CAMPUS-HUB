const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth);
const {createEvent} = require("../controllers/eventController");

router.post("/createEvent",createEvent);

module.exports = router;