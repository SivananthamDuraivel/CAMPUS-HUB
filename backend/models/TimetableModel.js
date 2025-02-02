const mongoose = require("mongoose")
const timetableSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },
  department: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  days: [{
    day: {
      type: String,
      enum: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      required: true
    },
    timetable: [
      {
        periodNumber: Number,
        startTime: String,
        endTime: String,
        subject: String,
        teacher: String,
        room: String
      }
    ]
  }
]
}, {timestamps:true})

module.exports = mongoose.model('Timetable',timetableSchema);