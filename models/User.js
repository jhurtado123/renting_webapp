const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  rol:[],
  profile_image: String,
  description: String,
  dni: String,
  reviews: [{
    content: {
      type: String,
      required: true
    },
    valoration: Number,
    userid: {
      type: String,
      required: true
    },
  }]
});


const User = mongoose.model('User', userSchema);

module.exports = User;