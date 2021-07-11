const express = require('express');
const router = express.Router();

const personnels = require('../models/personnels');
const { isAuthenticated } = require('../helpers/auth');

router.get('/person/add', isAuthenticated, (req, res) => {
    res.render('dataperson/add');
});

router.post('/person/add', isAuthenticated, async (req, res) => {
    const { firts_name, last_name, country, phone, linkedin, github, skype, summary } = req.body;
    const errors = [];
    /*if(!firts_name || !last_name) {
        errors.push({text: 'Por favor ingrese sus nombres personales'});
    }*/
    if(!country) {
        errors.push({text: 'Por favor ingrese su Pais de residencia'});
    }
    if(!phone) {
        errors.push({text: 'Por favor ingrese su numero de contacto'});
    } else {
        const NewPerson = new personnels({ firts_name, last_name, country, phone, linkedin, github, skype, summary });
        NewPerson.user = req.user.id;
        await NewPerson.save();
        req.flash('success_msg', 'Data Cargada Exitosamente');
        res.redirect('/data');
    }
});

router.get('/person/edit/:id', isAuthenticated, async (req, res) => {
    const eperson = await personnels.findById(req.params.id).lean();
    res.render('dataperson/edit', {eperson});
});

router.put('/person/edit-person/:id', isAuthenticated, async (req, res) => {
    const { firts_name, last_name, country, phone, linkedin, skype, github, summary } = req.body;
    await personnels.findByIdAndUpdate(req.params.id, { firts_name, last_name, country, phone, linkedin, skype, github, summary });
    req.flash('success_msg', 'Datos Actualizados');
    res.redirect('/data');
});

router.get('/person/delete/:id', isAuthenticated, async (req, res) => {
    await personnels.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Data Borrada');
    res.redirect('/data');

});

module.exports = router;