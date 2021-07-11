const express = require('express');
const router = express.Router();

const languages = require('../models/languages');
const { isAuthenticated } = require('../helpers/auth');

router.get('/lang/add', isAuthenticated, (req, res) => {
    res.render('datalang/add');
});

router.post('/lang/Eadd', isAuthenticated, async (req, res) => {
    const { idioms, level } = req.body;
    const errors = [];
    if(!idioms) { errors.push({text: 'Por favor Ingrese Idioma'})}
    else { 
        const NewLang = new languages({ idioms, level });
        NewLang.user = req.user.id;
        await NewLang.save();
        req.flash('success_msg', 'Datos de Idiomas Cargados');
        res.redirect('/data');
        //res.render('datalang/add');

    }
});

router.get('/lang/edit/:id', isAuthenticated, async (req, res) => {
    const langedit = await languages.findById(req.params.id).lean();
    res.render('datalang/edit', {langedit});
});

router.put('/lang/edit-lang/:id', isAuthenticated, async (req, res) => {
    const { idioms, level } = req.body;
    const errors = [];
    if(!idioms) { errors.push({text: 'Por favor Ingrese Idioma'})}
    else {
        await languages.findByIdAndUpdate(req.params.id, { idioms, level });
        req.flash('success_msg', 'Datos Actualizados');
        res.redirect('/data');
    }
});

router.get('/lang/delete/:id', isAuthenticated, async (req, res) => {
    await languages.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Data Borrada');
    res.redirect('/data');
});

module.exports = router;