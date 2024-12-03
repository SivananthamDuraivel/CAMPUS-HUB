const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: { 
    type: String, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  teacher: { 
    type: String, 
    required: true 
  },
  room: { 
    type: String, 
    required: true 
  },
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
