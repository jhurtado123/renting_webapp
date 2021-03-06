const mongoose = require('mongoose');

const {Schema} = mongoose;

const messageSchema = new Schema({
    message: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    isReaded: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true

  });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
