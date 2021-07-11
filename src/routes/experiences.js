const express = require('express');
const router = express.Router();

const experience = require('../models/experiences');
const { isAuthenticated} = require('../helpers/auth');

router.get('/exp/add', (req, res) => {
    res.render('dataexp/add');
});

router.post('/exp/add', isAuthenticated, async (req, res) => {
    const { company, position, wfrom, wto, follow, detail } = req.body;
    const errors = [];
    if(!company || !position) { errors.push({text: 'Campo Empresa o posición vacios'})}
    if(!wfrom || !wto) {errors.push({text: 'Campo Fecha Entrada o Salida vacios'}) }
    if(!detail)  {errors.push({text: 'Ingrese Detalle de su actividad'}) }
    else {
        const NewExperience = new experience({ company, position, wfrom, wto, follow, detail});
        NewExperience.user = req.user.id;
        await NewExperience.save();
        req.flash('success_msg', 'Datos Cargados');
        res.redirect('/data');
    }

}); 

router.get('/exp/edit/:id', isAuthenticated, async (req, res) => {
    const eexp = await experience.findById(req.params.id).lean();
    res.render('dataexp/edit', {eexp});
});

router.get('/exp/edit2/:id', isAuthenticated, async (req, res) => {
    const eexp = await experience.findById(req.params.id).lean();
    res.render('dataexp/edit2', {eexp});
});

router.put('/exp/edit/:id', isAuthenticated, async (req, res) => {
    const { company, position, wfrom, wto, follow, detail } = req.body;
    await experience.findByIdAndUpdate(req.params.id, {company, position, wfrom, wto, follow, detail});
    req.flash('success_msg', 'Datos Actualizados');
    res.redirect('/data');
});

router.get('/exp/delete/:id', isAuthenticated, async (req, res) => {
    await experience.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Data Borrada');
    res.redirect('/data');
});


module.exports = router;