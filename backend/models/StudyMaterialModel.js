const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema({
    department: { type: String, required: true },
    subject: { type: String, required: true },
    materials: [
        {
            topicName: { type: String, required: true },
            files: [
                {
                    name: { type: String, required: true },
                    url: { type: String, required: true },
                }
            ]
        }
    ]
});

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
