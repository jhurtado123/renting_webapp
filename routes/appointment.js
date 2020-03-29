const express = require('express');
const router = express.Router();

const Appointment = require('../models/Appointment');
const Ad = require('../models/Ad');
const Chat = require('../models/Chat');
const User = require('../models/User');
const createNotifications = require('../helpers/notifications');


/* create appointment */
router.post('/create', (req, res, next) => {
  const {lesser, lessor, ad} = req.body;
  Ad.findOne({_id: ad})
    .then(ad => {
      const date = Date.now(); //TODO el date ha de llegar en el post
      console.log('lesser', lesser);
      return new Appointment({lesser, lessor, ad, date, status: 'Active'}).save();
    })
    .then(result => res.send({status: 200}))
    .catch(error => next(error) );
});

/* edit appointment */
router.get('/edit/:appointmentId', (req, res, next) => {
  Appointment.findOne({_id: req.params.appointmentId}).populate('ad lesser lessor')
    .then(appointment => {
      res.render('appointments/edit', {appointment});
    })
    .catch(error => next(error));
});
router.post('/edit/:appointmentId', (req, res, next) => {
  const { status } = req.body;
  Appointment.findOne({_id: req.params.appointmentId})
    .then(appointment => {
      appointment.status = status;
      return appointment.save();
    })
    .then(result => res.redirect(`/appointment/view/${req.params.appointmentId}`))
    .catch(error => next(error));
});

/*view appointment*/
router.get('/view/:appointmentId', (req, res, next) => {
  Appointment.findOne({_id: req.params.appointmentId}).populate('ad lesser lessor')
    .then(appointment => {
      res.render('appointments/view', {appointment, layout: false});
    })
    .catch(error => next(error));
});

/*delete appointment*/
router.get('/delete/:appointmentId', (req, res, next) => {
  let appointmentToRemove;
  Appointment.findOne({_id: req.params.appointmentId}).populate('ad')
    .then(appointment => {
      appointmentToRemove = appointment;
      createNotifications([appointment.lesser, appointment.lessor], {'title':`${req.session.currentUser.name} ha cancelado la cita en ${appointment.ad.address}, ${appointment.ad.number}`, 'href': '/users/appointments'});
      return Chat.findOne({_id: appointmentToRemove.chat});
    })
    .then(chat => {
      chat.hasAppointment = false;
      return chat.save();
    })
    .then(res => {
      return appointmentToRemove.remove();
    })
    .then(result => res.redirect(`/users/appointments`))
    .catch(error => next(error));
});

module.exports = router;
