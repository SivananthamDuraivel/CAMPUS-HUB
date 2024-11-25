const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'College', 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  eventDate: { 
    type: Date, 
    required: true 
  },
  registrationDeadline: { 
    type: Date, 
    required: true 
  },
  notificationPeriod: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['intra', 'inter'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  approvedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  participants: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ] 
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
