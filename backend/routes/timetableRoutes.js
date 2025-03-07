const express = require('express');
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
const { insertTimetable, getTimetable } = require('../controllers/timetableController');
router.use(requireAuth);


router.post('/insertTimetable', insertTimetable);
router.get('/getTimetable', getTimetable)

module.exports = router;
