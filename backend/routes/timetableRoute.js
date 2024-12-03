const express = require('express');
const router = express.Router();
const { createTimetable } = require('../controllers/timetableController');


router.post('/timetable', createTimetable);

module.exports = router;
