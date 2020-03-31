const mongoose = require('mongoose');
const User = require('../models/User');
const moment = require('moment');
const Appointment = require('../models/Appointment');
const notification = require('./notifications');


function changeAppointmentStatusIfFinished(req, res, next) {
  const userId = req.session.currentUser._id;
  const now = moment().add(2, 'hours');
  Appointment.find({'status': 'Active', $or: [{'lesser': userId, date : {$lt: now}}, {'lessor': userId, date : {$lt: now}}]}).populate('lesser lessor')
    .then(appointments => {
      appointments.forEach(appointment => {
        appointment.status = 'Finalizada';
        notification([appointment.lesser], {'title': `Tu cita con ${appointment.lessor.name} ha terminado. Dejale una valoración.`, 'href': `/review/${appointment._id}/create`});
        appointment.save();
      });
      return next();
    })
    .catch(err => next());
}

module.exports = {changeAppointmentStatusIfFinished};