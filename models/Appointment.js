const mongoose = require('mongoose');

const {Schema} = mongoose;

const appointmentSchema = new Schema({
    lessor: {type: Schema.Types.ObjectId, ref: 'User'}, //inquilino
    lesser: {type: Schema.Types.ObjectId, ref: 'User'}, //propietario
    ad: {type: Schema.Types.ObjectId, ref: 'Ad'},
    status: String,
    date: Date
  },
  {
    timestamps: true
  });


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;