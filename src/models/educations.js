const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationsSchema = new Schema({
    carrer: {type: String, required: true},
    school: {type: String, required: true},
    from: {type: Date, required: true},
    to: {type: Date},
    user: {type: String},
})

EducationsSchema
    .virtual('ffrom')
    .get(function () {
        return DateTime.fromJSDate(this.from).toLocaleString(DateTime.Date_MED);
    });
  

module.exports = mongoose.model('Educations', EducationsSchema);