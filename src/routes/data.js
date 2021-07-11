const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');

const fs = require('fs');
const pdfKit = require('pdfkit');
const download = require('download');

const User = require('../models/User');
const personnels = require('../models/personnels');
const educations = require('../models/educations');
const languages = require('../models/languages');
const skills = require('../models/skills');
const knowings = require('../models/knowings');
const experiences = require('../models/experiences');

const { isAuthenticated } = require('../helpers/auth');
const { exit } = require('process');

router.get('/data', isAuthenticated, async (req, res) => {
  const datauser = await User.findById(({ _id: req.user.id })).lean();
  const dataperson = await personnels.find({ user: req.user.id }).lean();
  const dataedu = await educations.find({ user: req.user.id }).lean();
  const datalang = await languages.find({ user: req.user.id }).lean();
  const dataskills = await skills.find({ user: req.user.id }).lean().sort({ skill: 'asc' });
  const dataknow = await knowings.find({ user: req.user.id }).lean();
  const dataexp = await experiences.find({ user: req.user.id }).lean().sort({ wfrom: 'desc' });
  res.render('data/info', { dataperson, dataedu, datalang, dataskills, dataknow, dataexp, datauser });
});

router.get('/pdf', async (req, res) => {

  const datauser = await User.findById(({ _id: req.user.id }));
  const person = await personnels.findOne({ user: req.user.id });
  const edu = await educations.find({ user: req.user.id });
  const lang = await languages.find({ user: req.user.id });
  const dskills = await skills.find({ user: req.user.id }).sort({ skill: 'asc' });
  const know = await knowings.find({ user: req.user.id }).sort({ knowings: 'asc' });
  const exp = await experiences.find({ user: req.user.id }).sort({ wfrom: 'desc' });

  let idi = Math.floor(Math.random() * 100);
  const namefile = 'MeRcv-' + `${idi}` + '.pdf';

  const doc = new pdfKit();
  download(doc.pipe(fs.createWriteStream(namefile)));
  
  let Y = 152;
  let x = 0;
  let t = 0

  //Encabezado
  doc.fontSize(16)
    .fillColor('#E0DADA')
    .font('Times-Roman')
    .text('Resumen CV', 60, 60,);

  //Titulo    
  doc.fontSize(20)
    .fillColor('#1F1F1F')
    .text(`${person.firts_name} ${person.last_name}`, { align: 'center' });
  doc.fontSize(12)
    .text(`${edu[0].carrer}`, { align: 'center' });

  //linea izquiera
  doc.rect(0, 0, 40, 5000);
  doc.fill('#E0DADA');

  //fondo contacto, educacion, idiomas
  doc.rect(55, 134, 500, 15)
    .fillOpacity(3)
    .fill('#E0DADA');

  doc.font(__dirname + '/Roboto-Regular.ttf')
  doc.fontSize(8);

  //Contacto
  doc
    .fillColor('#1F1F1F')
    .text('Contacto', 60, 138)
    .text(`Ubicacion: ${person.country}`, 60, 152)
    .text(`Telefono: ${person.phone}`)
    .text(`Email: ${datauser.email}`)
    .text(`Linkedin: ${person.linkedin}`, { width: 200 })
    .text(`GitHub: ${person.github}`)
    .text(`Skype: ${person.skype}`);

  //Educacion
  doc
    .text('Educacion', 260, 138, { bold: true })
  for (let i = 0; i < edu.length; i++) {
    const ffrom = moment(edu[i].from).format("DD-MM-YYYY");
    const fto = moment(edu[i].to).format("DD-MM-YYYY");
    doc
      .text(`¤ ${edu[i].carrer}`, 260, Y)
      .text(`${edu[i].school}`, 260, (Y + 10))
      .text(ffrom + ' / ' + fto, 260, (Y + 20))
    Y += 35;
  }
  //Lenguage  
  doc
    .text('Idiomas', 445, 138, { bold: true })
  let ly = 152;
  for (let i = 0; i < lang.length; i++) {
    doc
      .text(`¤ ${lang[i].idioms}: ${lang[i].level}`, 445, ly);
    ly += 10;
  }
  //Sumario
  Y = Y + 6;
  doc.rect(55, Y, 500, 15)
    .fillOpacity(3)
    .fill('#E0DADA');

  Y = Y + 4;
  doc
    .fillColor('#1F1F1F')
    .text('Sumario', 60, Y);
  Y = Y + 16;
  doc.text((`${person.summary}`), 60, Y, { align: 'justify' });

  //Conocimientos
  Y = Y + 120;
  doc.rect(55, Y, 500, 15)
    .fillOpacity(3)
    .fill('#E0DADA');
  Y = Y + 4;

  doc
    .fillColor('#1F1F1F')
    .text('Conocimientos', 60, Y);
  Y = Y + 12;

  for (let i = 0; i < know.length; i++) {
    if (x == 0) {
      doc.text(`${know[i].knowing}`, 60, Y, { width: 180 });
    } if (x == 1) {
      doc.text(`${know[i].knowing}`, 250, Y, { width: 180 });
    }
    if (x == 2) {
      doc.text(`${know[i].knowing}`, 440, Y, { width: 180 });
      t = 1;
    }
    if (t == 1 && Y <= 720) {
      x = 0;
      t = 0;
      Y += 12;
    } else { x++; }
    if (Y >= 720) {
      Y = 60;
      doc.addPage();
      //linea izquiera
      doc.rect(0, 0, 40, 5000);
      doc.fill('#E0DADA');
      doc.rect(55, 60, 500, 15)
        .fillOpacity(3)
        .fill('#E0DADA');
      doc
        .fillColor('#1F1F1F')
        .text('Conocimientos', 60, 68);
    }
  };

  //Habilidades
  Y = Y + 20;
  doc.rect(55, Y, 500, 15)
    .fillOpacity(3)
    .fill('#E0DADA');
  Y = Y + 4;
  doc
    .fillColor('#1F1F1F')
    .text('Habilidades', 60, Y);
  Y = Y + 12;

  x = 0;
  for (let i = 0; i < dskills.length; i++) {
    if (x == 0) {
      doc.text(`${dskills[i].skill}`, 60, Y, { width: 180 });
    } if (x == 1) {
      doc.text(`${dskills[i].skill}`, 250, Y, { width: 180 });
    }
    if (x == 2) {
      doc.text(`${dskills[i].skill}`, 440, Y, { width: 180 });
      t = 1;
    }
    if (t == 1 && Y <= 720) {
      x = 0;
      t = 0;
      Y += 12;
    } else { x++; }
    if (Y >= 720) {
      Y = 60;
      doc.addPage();
      //linea izquiera
      doc.rect(0, 0, 40, 5000);
      doc.fill('#E0DADA');
      doc.rect(55, Y, 500, 15)
        .fillOpacity(3)
        .fill('#E0DADA');
      Y += 8;
      doc
        .fillColor('#1F1F1F')
        .text('Habilidades', 60, Y);
      Y += 12;
    }
  };
  //Experiencia
  //fondo 
  Y += 20;
  doc.rect(55, Y, 500, 15)
    .fillOpacity(3)
    .fill('#E0DADA');
  Y += 4;
  doc
    .fillColor('#1F1F1F')
    .text('Experiencia', 60, Y);
  x = 0;
  Y += 14;
  for (let i = 0; i < exp.length; i++) {
    const efrom = moment(exp[i].wfrom).format("DD-MM-YYYY");
    const eto = moment(exp[i].wto).format("DD-MM-YYYY");
    doc
      .fillColor('#1F1F1F')
      .text(`- Empresa : ${exp[i].company}`);
    Y += 10;
    doc.text(`Cargo : ${exp[i].position} Desde: ${efrom} Hasta ${eto}`);
    Y += 10;
    doc.text('Detalle del Cargo');
    Y += 10;
    doc.text(`${exp[i].detail}`);

    if (Y >= 720) {
      Y = 60;
      /*doc.addPage(); */
      //linea izquiera
      doc
        .rect(0, 0, 40, 5000)
        .fill('#E0DADA');
      /*doc.rect(55, Y, 500, 15)
        .fillOpacity(3)
        .fill('#E0DADA');
      Y += 8;
      doc
        .fillColor('#1F1F1F')
        .text('Experiencia', 60, Y);
      Y += 10;
      console.log(">" + Y);  */

    } /*else { Y += 10; }*/
    Y += 10;
  };
  /*down(namefile); */
  doc.end();
  req.flash('success_msg', 'Archivo Creado nombre: ', namefile);
  
  res.redirect('data');
});

function down(res, req) {
  download('/', res);
  return;
}
module.exports = router;