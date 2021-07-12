const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1mzxk.mongodb.net/${process.env.DBNAME}?retryWrites=true`;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
