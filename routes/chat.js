const express = require('express');
const router = express.Router();
const app = require('../app');
const Chat = require('../models/Chat');
const Ad = require('../models/Ad');
const Message = require('../models/Message');
const createNotifications = require('../helpers/notifications');

//unreadedMessages.push({chat: chat._id, count})
//Socketio
const io = require('socket.io')();
app.socketIO = io;

router.get('/', (req, res, next) => {
  const userId = req.session.currentUser._id;
  Chat.find({$or: [{'lessee': userId}, {'lessor': userId}]}).sort({createdAt: -1}).populate('lessee lessor ad')
    .then(async chats => {
      let unreadedMessages = [];
      for (let i = 0; i < chats.length; i++) {
        let messagesUnread = await getUnreadedMessagesFromChat(chats[i], userId);
        unreadedMessages.push(messagesUnread);
      }
      res.render('chats/list', {chats, unreadedMessages})
    })
    .catch(error => next(error));
});

async function getUnreadedMessagesFromChat(chat, userId) {
  let response = {};
  await Message.countDocuments({'chat': chat._id, sender: {$ne: userId}, isReaded: false})
      .then(count => response = {chat: chat._id, count})
      .catch(err =>  response = {chat: chat._id, count:-1});

  return response;
}

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
      createNotifications([result.lessor],{'title': 'Tienes un nuevo chat!', 'href': `/chats/${result._id}`});
      return res.redirect(`/chats/${result._id}`);
    })
    .catch(error => console.log(error));
});

app.io.on('connection', (socket) => {
  socket.on('room:join', function (room) {
    socket.join(room);
  });
  socket.on('chat:message', data => {
    let isReaded = Object.keys(app.io.sockets.adapter.rooms[data.chatId].sockets).length > 1;
    new Message({message: data.message, sender: data.sender, chat: data.chatId, isReaded}).save();
    socket.in(data.chatId).emit('chat:message', data)
  });
});

router.get('/:chatId', (req, res, next) => {
  const {chatId} = req.params;

  let chatEntity;
  Chat.findOne({_id: chatId}).populate('lessee lessor ad')
    .then(chat => {
      chatEntity = chat;
      Message.update({chat: chat._id, sender: {$ne: req.session.currentUser._id }}, {isReaded: true}, {multi:true}).then(res => console.log('ok'));
      return Message.find({'chat': chatId});
    })
    .then(messages => {
      res.render('chats/chat', {layout: false, chat: chatEntity, messages});
    })
    .catch(error => next(error));
});

module.exports = router;
