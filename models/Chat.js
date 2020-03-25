const mongoose = require('mongoose');

const {Schema} = mongoose;

const chatSchema = new Schema({
    ad: { type: Schema.Types.ObjectId, ref: 'Ad' },
    lessor: { type: Schema.Types.ObjectId, ref: 'User' },
    lessee: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true

  });

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;