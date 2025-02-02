const mongoose = require("mongoose");

const yearSchema = new mongoose.Schema({
  yearName: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  }]
}, {timestamps : true})

module.exports = mongoose.model("Year", yearSchema);