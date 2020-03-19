const express = require('express');
const router = express.Router();

const Appointment = require('../models/Appointment');
const Ad = require('../models/Ad');
const User = require('../models/User');

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
      res.render('appointments/view', {appointment});
    })
    .catch(error => next(error));
});

/*delete appointment*/
router.get('/delete/:appointmentId', (req, res, next) => {
  Appointment.findOne({_id: req.params.appointmentId})
    .then(appointment => {
      return appointment.remove();
    })
    .then(result => res.redirect(`/users/appointments`))
    .catch(error => next(error));
});

module.exports = router;
