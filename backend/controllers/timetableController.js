const Timetable = require("../models/TimetableModel");

const insertTimetable = async(req,res)=>{
  try {
    const {college,department,year,section,days} = req.body;
    if(!college || !department || !year || !section || !days) {
      return res.status(400).json({message : "All fields are required"});
    }
    console.log("hello");
    const newTimeTable = new Timetable({
      college,
      department,
      year,
      section,
      days
    })

    await newTimeTable.save();

    return res.status(201).json({message : 'Timetable added successfully'});
  }
  catch(error) {
    console.log("Error inserting timetable: ",error);
    return res.status(500).json({message: 'Server error'})
  }
}

module.exports = { insertTimetable }