const mongoose = require('mongoose');

const { Schema } = mongoose;

const adSchema = new Schema({
  title: String,
  address: {
    require: true,
    type: String
  },
  city: String,
  postal_code: Number,
  coords: {
    lat: Number,
    lng: Number
  },
  price: Number,
  parameters: Array,
  Appointments: {
    date: Date,
    lessor: { type: Schema.Types.ObjectId, ref: 'User' },
    lesser: { type: Schema.Types.ObjectId, ref: 'User' },
    status: String
  }

});


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;