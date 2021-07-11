const mongoose = require('mongoose');
const { Schema } = mongoose;

const PersonnelsSchema = new Schema({
    firts_name: {type: String, required: true},
    last_name: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: String, required: true},
    linkedin: {type: String},
    github: {type: String},
    skype: {type: String},
    summary: {type: String, trim: true},
    dcreate: { type: Date, default: Date.now},
    user: {type: String},
})



module.exports = mongoose.model('Personnels', PersonnelsSchema);