const express = require('express');
const router = express.Router();

const knowings = require('../models/knowings');
const { isAuthenticated } = require('../helpers/auth');

router.get('/know/add', isAuthenticated, async (req, res) => {
    const aknow = await knowings.find({user: req.user.id}).lean().sort({knowing: 'asc'})
    res.render('dataknow/add', {aknow});
});

router.post('/know/add', isAuthenticated, async (req, res) => {
    const { knowing } = req.body;
    const errors = [];
    if(!knowing) {errors.push({text: 'Por favor Agregue Conocimiento'});}
    else {
        const Verify = await knowings.findOne({knowing: knowing});
        if(Verify){
            req.flash('error_msg', 'Conocimiento ya Agregada');
            res.redirect('/know/add');
        } else {
            const NewKnow = new knowings({knowing});
            NewKnow.user = req.user.id;
            await NewKnow.save();
            res.redirect('/know/add');
        }
        
    }
});
/*router.post('/know/add', isAuthenticated, async (req, res) => {
    const { knowing } = req.body;
    const errors = [];
    if(!knowing) {errors.push({text: 'Por favor Agregue Conocimiento'});}
    else {
    const NewKnow = new knowings({knowing});
    NewKnow.user = req.user.id;
    await NewKnow.save();
    req.flash('success_msg', 'Conocimiento Agregado');
    res.redirect('/data');
    }
});*/

router.get('/know/edit/:id', isAuthenticated, async (req, res) => {
    const eknow = await knowings.findById(req.params.id).lean();
    res.render('dataknow/edit', {eknow});
});

router.put('/know/edit/:id', isAuthenticated, async (req, res) => {
    const knowing = req.body;
    await knowings.findByIdAndUpdate(req.params.id, { knowing });
    req.flash('success_msg', 'Datos Actualizados');
    res.redirect('/data');
});

router.get('/know/delete/:id', isAuthenticated, async (req, res) => {
    await knowings.findByIdAndDelete(req.params.id);
    res.redirect('/know/add');
});

module.exports = router;