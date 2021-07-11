const { Router } = require('express');
const User = require('../models/User');
const personnels = require('../models/personnels');
const educations = require('../models/educations');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const config = require('../config.js');


const router = Router();

router.get('/email/:id', async (req, res) => {
    const datauser = await User.findById(req.params.id).lean();
    res.render('data/email', {datauser});
});

router.post('/email/:id', async (req, res) => {
    const datauser = await User.findById(req.params.id);
    const person = await personnels.findOne({ user: req.params.id });
    const edu = await educations.find({ user: req.params.id });

    const {Semail, message} = req.body;

    contentHTML = `
        <div style="float: left; width: 900px; height: 300px; background-color: #f2f2f2; border-left: solid #2952a3 4px; padding: 20px;">
            <h1>Principal Informacion</h1>
            <ul>
                <li>Nombre Completo: ${person.firts_name} ${person.last_name}</li>
                <li>Profesion: ${edu[0].carrer}</li>
                <li>Telefono: ${person.phone}</li>
                <li>Email: ${datauser.email}</li>
            </ul></br>
            <p>${message}.</p></br>
        <p>Mayor informacion y Detalle del Perfil, favor ingresar <a href="http://localhost:3000/review/${datauser._id}">aqui</a></p><hr>
        <p style="font-size: 10px; margin-left: 180px; margin-top: 20px">MeCV es aplicacion gratuita para la carga de resumen CV, el cual podra:</p>
      <p style="font-size: 10px; margin-left: 210px;">Mantener en Linea | Descargar en PDF | Enviar Email</p><hr>
        </div>
    `;

    const transporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: `${config.KEYEMAIL}`
        })
    );

    const info = await transporter.sendMail({
        from: 'meresumencv@gmail.com',
        to: `${Semail}`,
        subject: 'Informacion Resumen CV desde MeCV',
        //text: 'hello World'
        html: contentHTML
    });
    req.flash('success_msg', 'Email Enviado..');
    res.redirect('/data');

});

module.exports = router;