const express = require('express');
const router = express.Router();
const app = require('../app');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'fairrentironhack@gmail.com',
    pass: 'fairrent2020*'
  }
});


router.get('/', (req, res, next) => {
  res.render('support/index', {'error': req.flash('error'), 'ok': req.flash('ok')});
});

router.post('/', (req, res, next) => {

  const mailOptions = {
    from: 'fairrentironhack@gmail.com',
    to: ['hurtadojose89@gmail.com', 'jaimemoravallejo@gmail.com'],
    subject: 'FairRent | Nuevo ticket de soporte',
    text: `
      Mensaje:
      ${req.body.question}
      Nombre del usuario:
      ${req.session.currentUser.name}
      Email de contacto:
      ${req.session.currentUser.username}
    `
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      req.flash('error', 'Error en el envío del ticket' + error);
    } else {
      req.flash('ok', 'Ticket envíado correctamente, en breves recibirás respuesta');
    }
    res.redirect('/support');
  });

});


module.exports = router;
