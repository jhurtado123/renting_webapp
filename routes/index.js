const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/*Register page*/
router.get('/register', (req, res, next) => {
  res.render('register', {messages: req.flash()});
});
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    req.flash('error', 'Rellena todos los campos');
    res.redirect('/register');
  }

  User.findOne({username})
    .then(user => {
      if (user) {
        req.flash('error', 'El usuario ya existe');
        res.redirect('/register');
      }
      const salt  = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return new User({username, password: hash}).save();
    })
    .then(user => {
      req.flash('success', true);
      res.redirect('/register');
    })
    .catch(error => console.log(error));
});

module.exports = router;
