const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, callback) => {
    const user = await User.findOne({email: email});
    if(!user) {
        return callback(null, false, { message: 'Usuario No Encontrado, Si es primera vez, por favor registrese'});
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return callback(null, user);
        } else {
            return callback(null, false, {message: 'Password No Correcto'});
        }
    }
}));

passport.serializeUser((user, callback) => {
    callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
    User.findById(id, (err, user) => {
        callback(err, user);
    });
});