const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const moment = require('moment-timezone');

//const fs = require('fs');
//const pdfkit = require('pdfkit');
require('dotenv').config();

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

//Initializtions
const app = express();
require('./database');
require('./config/passport');
moment().tz("America/Caracas").format();
module.exports = function dateFormat(date, format, utc) {
    return (utc === true) ? moment(date).utc().format(format) : moment(date).format(format);
};

//Setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'globalcc',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/personnels'));
app.use(require('./routes/users'));
app.use(require('./routes/educations'));
app.use(require('./routes/data'));
app.use(require('./routes/languages'));
app.use(require('./routes/skills'));
app.use(require('./routes/knowings'));
app.use(require('./routes/experiences'));
app.use(require('./routes/review'));
app.use(require('./routes/email'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});