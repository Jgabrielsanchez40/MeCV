const mongoose = require('mongoose');
const { Schema } = mongoose;

const LanguagesSchema = new Schema({
    idioms: { type: String, required: true},
    level: { type: String, required: true, default: 'Basico'},
    user: { type: String}
});

module.exports = mongoose.model('Languages', LanguagesSchema);