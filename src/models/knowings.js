const mongoose = require('mongoose');
const { Schema } = mongoose;

const KnowingsSchema = new Schema ({
    knowing: { type: String, required: true},
    user: { type: String }
});

module.exports = mongoose.model('Knowings', KnowingsSchema);