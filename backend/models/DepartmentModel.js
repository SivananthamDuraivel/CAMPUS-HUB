const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trime: true
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true
  },
  years: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true
  }]
},{timestamps : true})

module.exports = mongoose.model("Department", departmentSchema);