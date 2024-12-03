const Timetable = require('../models/TimetableModel');

const createTimetable = async (req, res) => {
  try {
    const { day, time, subject, teacher, room, collegeId } = req.body;

    if (!day || !time || !subject || !teacher || !room || !collegeId) {
      return res.status(400).json({ error: "All fields must be filled." });
    }

    const timetable = new Timetable({
      day,
      time,
      subject,
      teacher,
      room,
      college: collegeId,
    });

    await timetable.save();

    res.status(201).json({ message: "Timetable created successfully!", timetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createTimetable };
