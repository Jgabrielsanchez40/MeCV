const mongoose = require('mongoose');
const config = require('./config.js');


const uri = `mongodb+srv://${config.USER}:${config.PASSWORD}@cluster0.1mzxk.mongodb.net/${config.DBNAME}?retryWrites=true`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

});
