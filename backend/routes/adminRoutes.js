const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
router.use(requireAuth);
const {updateCanCreateEvent , fetchUsers} = require("../controllers/adminController");

router.patch("/updateCanCreateEvent",updateCanCreateEvent);
router.get('/fetchUsers', fetchUsers);

module.exports = router;