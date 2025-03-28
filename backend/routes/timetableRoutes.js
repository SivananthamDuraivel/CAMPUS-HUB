const express = require('express');
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")
const { insertTimetable, getTimetable, getTimetableForUser } = require('../controllers/timetableController');
router.use(requireAuth);


router.post('/insertTimetable', insertTimetable);
router.get('/getTimetable', getTimetable)
router.get('/getTimetableForUser',getTimetableForUser);

module.exports = router;
