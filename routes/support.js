const express = require('express');
const router = express.Router();
const app = require('../app');
const mailer = require('express-mailer');

/*MAILER CONF*/
mailer.extend(app, {
  from: 'no-reply@fairrent.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 587,
  transportMethod: 'SMTP',
  auth: {
    user: 'fairrentironhack@gmail.com',
    pass: 'fairrent2020*'
  }
});

router.get('/', (req, res, next) => {
  res.render('support/index', {'error': req.flash('error'), 'ok': req.flash('ok')});
});

router.post('/', (req, res, next) => {
  app.mailer.send('email', {
    to: 'hurtadojose89@gmail.com',
    subject: 'Petición de soporte',
  }, function (err) {
    if (err) {
      req.flash('error', 'Error en el envío del ticket'+ err);
    } else {
      req.flash('ok', 'Ticket envíado correctamente, en breves recibirás respuesta');
    }
    res.redirect('/support');
  });
});


module.exports = router;
