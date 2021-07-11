const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new Schema({
    skill: {type: String, required: true},
    user: {type: String}
});

module.exports = mongoose.model('Skill', SkillSchema);