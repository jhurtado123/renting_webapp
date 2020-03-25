const express = require('express');
const router = express.Router();
const app = require('../app');
const Chat = require('../models/Chat');
const Ad = require('../models/Ad');
const Message = require('../models/Message');

//Socketio
const io = require('socket.io')();
app.socketIO = io;

router.get('/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  Chat.find({$or: [{'lessee': userId}, {'lessor': userId}]}).populate('lessee lessor ad')
    .then(chats => {
      res.render('chats/list', {chats})
    })
    .catch(error => next(error));
});

router.post('/create', (req, res, next) => {
  const adId = req.body.ad;
  Chat.find({ad: adId, lessee: req.session.currentUser._id})
    .then(chat => {
      if(!chat.length) return Ad.findOne({_id: adId});

      return res.redirect(`/chats/${chat[0]._id}`);
    })
    .then(ad => {
      return new Chat({lessor: ad.owner, lessee: req.session.currentUser._id, ad: ad._id}).save();
    })
    .then(result => {
      return res.redirect(`/chats/${result._id}`);
    })
    .catch(error => console.log(error));
});

app.io.on('connection', (socket) => {
  socket.on('room:join', function (room) {
    socket.join(room);
  });
  socket.on('chat:message', data => {
    new Message({message: data.message, sender: data.sender, chat: data.chatId}).save();
    socket.in(data.chatId).emit('chat:message', data)
  });
});

router.get('/:chatId', (req, res, next) => {
  const {chatId} = req.params;

  let chatEntity;
  Chat.findOne({_id: chatId}).populate('lessee lessor ad')
    .then(chat => {
      chatEntity = chat;
      return Message.find({'chat': chatId});
    })
    .then(messages => {
      res.render('chats/chat', {layout: false, chat: chatEntity, messages});
    })
    .catch(error => next(error));
});

module.exports = router;
