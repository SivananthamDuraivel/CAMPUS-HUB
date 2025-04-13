const Timetable = require("../models/TimetableModel");
const User_details = require("../models/UserModel");


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


const getTimetableForUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Fetch user details
    const user = await User_details.findById(userId).populate("college department year");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract college, department, and year from user
    const { college, department, year } = user

    if (!college || !department || !year) {
      return res.status(400).json({ message: "User does not have complete academic details" });
    }

    const timetable = await Timetable.findOne({ college: college._id, department: department._id, year: year._id })
      .populate("college", "name")
      .populate("department", "name")
      .populate("year", "yearName");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }

    return res.status(200).json(timetable);
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const getCollegeTimetable = async (req, res) => {
  try {
    const admin = await User_details.findById(req.user._id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    if (!admin.college) {
      return res.status(400).json({ error: "Admin is not associated with any college" });
    }

    const timetables = await Timetable.find({ college: admin.college })
      .populate("department", "name")
      .populate("year", "yearName")
      .sort({ "days.day": 1 });

    res.status(200).json({ success: true, timetables });
  } catch (error) {
    console.error("Error fetching college timetable:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { insertTimetable, getTimetable, getTimetableForUser, getCollegeTimetable};
