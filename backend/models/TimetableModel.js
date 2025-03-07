const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    year: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Year",
      required: true,
    },
    // section: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Section",
    //   required: true,
    // },
    days: [
      {
        day: {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          required: true,
        },
        timetable: [
          {
            periodNumber: String,
            startTime: String,
            endTime: String,
            subject: String,
            teacher: String,
            room: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
