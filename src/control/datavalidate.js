const educations = require('../models/educations');
//const { isAuthenticated } = require('../helpers/auth');

const { body,validationResult} = require('express-validator');

exports.edu_create_post = [
    body('carrer', 'Por favor agregue carrero o profesion').trim().isLength({ min: 1}).escape(),
    body('school', 'Por favor agregue nombre instituto o universidad').trim().isLength({min: 1}).escape(),
    body('from', 'Agregue fecha de Inicio').optional({checkFalsy: true}).isISO8601().toDate(),
    body('to', 'Agregue fecha de Completado').optional({checkFalsy: true}).isISO8601().toDate(),

    (req, res) => {
        const errors = validationResult(req);

        const NewEdu = new educations({
            carrer: req.body.carrer,
            school: req.body.school,
            from: req.body.from,
            to: req.body.to
        });
        if(!errors.isEmpty()) {
            ( { educations: req.body, errors: errors });
            return;
        } else {
            NewEdu.user = req.user.id;
            NewEdu.save();
            req.flash('success_msg', 'Datos de Estudios Cargados');
            res.redirect('/data');

        }
    }
];