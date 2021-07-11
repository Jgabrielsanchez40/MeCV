const express = require('express');
const router = express.Router();

const educations = require('../models/educations');
const { isAuthenticated } = require('../helpers/auth');

router.get('/edu/add', isAuthenticated, (req, res) => {
    res.render('dataedu/add');
});


//router.post('/edu/Eadd', isAuthenticated, control.edu_create_post);

router.post('/edu/Eadd', isAuthenticated, async (req, res) => {
    const { carrer, school, from, to } = req.body;
    const errors = [];
    if (!carrer || !school) {
        errors.push({ text: 'Carrera/Profesion o Instituto/Universidad esta vacio' });
    }
    // if(from >= to) {
    //   errors.push({text: 'Fechas Erradas, por favor revise'});
    // } 
    else {
        const NewEdu = new educations({ carrer, school, from, to });
        NewEdu.user = req.user.id;
        await NewEdu.save();
        req.flash('success_msg', 'Datos de Estudios Cargados');
        res.redirect('/data');
    }
});

router.get('/edu/edit/:id', isAuthenticated, async (req, res) => {
    const eedu = await educations.findById(req.params.id).lean();
    res.render('dataedu/edit', { eedu });
});

router.get('/edu/edit2/:id', isAuthenticated, async (req, res) => {
    const eedu = await educations.findById(req.params.id).lean();
    res.render('dataedu/edit2', { eedu });
});

router.put('/edu/edit-edu/:id', isAuthenticated, async (req, res) => {
    const { carrer, school, from, to } = req.body;
    await educations.findByIdAndUpdate(req.params.id, { carrer, school, from, to });
    req.flash('success_msg', 'Datos Actualizados');
    res.redirect('/data');
});

router.get('/edu/delete/:id', isAuthenticated, async (req, res) => {
    await educations.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Data Borrada');
    res.redirect('/data');
});

module.exports = router;