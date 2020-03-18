const mongoose = require('mongoose');

const { Schema } = mongoose;

const adSchema = new Schema({
  title: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
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
  parameters: {
    'square_meters': Number,
    'flat_status': Number,
  },
  images: Array,
},
  {
    timestamps: true
  });


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;