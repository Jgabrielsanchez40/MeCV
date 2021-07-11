const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    company: { type: String, required: true },
    position: { type: String },
    wfrom: { type: Date },
    wto: { type: Date },
    follow: { type: String, Default: "No" },
    detail: { type: String, trim: true },
    user: { type: String }
});

module.exports = mongoose.model('Experience', ExperienceSchema);