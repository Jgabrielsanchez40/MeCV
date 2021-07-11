const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/data',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { email, password, confirm_password } = req.body;
    const errors = [];
    if(email.length <= 0) {
        errors.push({text: 'Por favor Agregue una direccion email'});
    }
    if(password.length <= 6) {
        errors.push({text: 'Password es muy corto'});
    }
    if(password != confirm_password) {
        errors.push({text: 'Password no es Igual a Confirmado'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, email});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('success_msg', 'Direccion Email Ya Existe.!!');
            res.redirect('/users/signup');
        }
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro Exitoso..!!');
        res.redirect('/users/signin');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;