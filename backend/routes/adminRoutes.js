const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth);
const {updateCanCreateEvent} = require("../controllers/adminController");

router.patch("/updateCanCreateEvent",updateCanCreateEvent);
module.exports = router;