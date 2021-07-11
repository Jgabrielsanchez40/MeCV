const mongoose = require('mongoose');
const config = require('./config.js');


const uri = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.1mzxk.mongodb.net/${config.DBNAME}?retryWrites=true`;
//mongoose.connect('mongodb://localhost/notes-db-app', {
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

});
     // .then(db => console.log('DB is connected'))
     // .catch(err => console.error(err));   mongoose.connect('mongodb+srv://josegs:J@se101202@cluster0.1mzxk.mongodb.net/MyRCV?retryWrites=true', {
