const express = require('express');
const router = express.Router();

const skills = require('../models/skills');

const { isAuthenticated } = require('../helpers/auth');

router.get('/skill/add', isAuthenticated, async (req, res) => {
    const eskill = await skills.find({user: req.user.id}).lean().sort({skill: 'asc'});
    res.render('dataskill/add', {eskill});
});

/*router.post('/skill/add-post', isAuthenticated, async (req, res) => {
    const { skill } = req.body;
    const errors = [];
    if(!skill) { errors.push({text: 'Por favor Ingrese Habilidad'});}
    else {
        const NewSkill = new skills({ skill });
        NewSkill.user = req.user.id;
        await NewSkill.save();
        req.flash('success_msg', 'Habilidad Agregada')
        res.redirect('/data');
    }
});*/

router.post('/skill/add-post', isAuthenticated, async (req, res) => {
    const { skill } = req.body;
    const errors = [];
    if(!skill) { errors.push({text: 'Por favor Ingrese Habilidad'});}
    else {
        const VerifySkill = await skills.findOne({skill: skill});
        if(VerifySkill){
            req.flash('error_msg', 'Habilidad ya Agregada');
            res.redirect('/skill/add');
        } else {
            const NewSkill = new skills({ skill });
            NewSkill.user = req.user.id;
            await NewSkill.save();
            res.redirect('/skill/add');
        }
        
    }
});



router.get('/skill/edit/:id', isAuthenticated, async (req, res) => {
    const eskill = await skills.findById(req.params.id).lean();
    res.render('dataskill/edit', {eskill});
});

router.put('/skill/edit/:id', isAuthenticated, async (req, res) => {
    const { skill } = req.body;
    await skills.findByIdAndUpdate(req.params.id, { skill });
    res.redirect('/data');
});

router.get('/skill/delete/:id', isAuthenticated, async (req, res) => {
    await skills.findByIdAndDelete(req.params.id);
    res.redirect('/skill/add');
});

module.exports = router;