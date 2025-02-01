const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
    department: { type: String, unique: true },
    subjectList: [
        {
            subject: { type: String, unique: true },
            materials: [
                {
                    topicName: { type: String, unique: true},
                    files: [
                        {
                            name: { type: String },
                            url: { type: String, required: true },
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);