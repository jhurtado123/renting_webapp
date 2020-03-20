const mongoose = require('mongoose');

const {Schema} = mongoose;

const adSchema = new Schema({
    title: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    description: String,
    address: {
      require: true,
      type: String
    },
    number: String,
    city: String,
    postal_code: String,
    coords: {
      lat: Number,
      lng: Number
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: [{
        type: [Number],
        required: true
      }]
    },
    price: Number,
    parameters: {
      'square_meters': Number,
      'flat_status': Number,
      'height': Number,
      'hasElevator': Boolean,
      'rooms': Number,
      'bathrooms': Number,
      'terrace': Boolean,
      'terrace_square_meters': Number,
      'parking': Boolean,
      'storage_room': Boolean
    },
    neighborhood: String,
    images: Array,
  },
  {
    timestamps: true
  });


const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;