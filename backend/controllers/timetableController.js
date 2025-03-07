const Timetable = require("../models/TimetableModel");

const insertTimetable = async (req, res) => {
  try {
    const { department, year, days } = req.body;

    if (!department || !year || !days) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const newTimetable = new Timetable({
      college: req.user.college,
      department,
      year,
      days,
    });

    await newTimetable.save()

    return res.status(201).json({ message: "Timetable added successfully", timetable: newTimetable });
  } catch (error) {
    console.error("Error inserting timetable:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getTimetable = async (req, res) => {
  try {
    const { college, department, year} = req.query;

    if (!college || !department || !year) {
      return res.status(400).json({ message: "All query parameters are required" });
    }

    const timetable = await Timetable.findOne({
      college,
      department,
      year
    })
    .populate("college", "name")
    .populate("department", "name")
    .populate("year", "yearName")

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    return res.status(200).json(timetable);
  } catch (error) {
    console.error("Error fetching timetable: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { insertTimetable, getTimetable };
