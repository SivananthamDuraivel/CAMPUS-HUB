const express = require('express');
const router = express.Router();
const { insertTimetable } = require('../controllers/timetableController');


router.post('/insertTimetable', insertTimetable);

module.exports = router;
