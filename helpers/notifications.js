const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (users, options) {
  users.forEach(id => {
    User.findOne({'_id': id})
      .then(user => {
        user.notifications.push({'title': options.title, 'href': options.href});
        user.save();
        return true;
      })
      .catch(err => console.log(err));
  })
};