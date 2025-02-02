const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }]
},{timestamps : true});

module.exports = mongoose.model('College', collegeSchema);
