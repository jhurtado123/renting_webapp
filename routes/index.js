const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Rent App' });
});

router.post('/login', (req, res, next) => {
  const { username, userPassword } = req.body;
    if (username === '' || password === '') {
      req.flash('error', 'no pueden estar vacios');
      res.redirect('/login');
    } else {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            req.flash('error', 'no estas registrado');
            res.redirect('/login');
          } else {
            console.log(bcrypt.compareSync(userPassword, user.password));
            if (bcrypt.compareSync(userPassword, user.passsword)) {
              req.session.currentUser = user;
              req.flash('info', 'Welcome to Rent App!');
              res.redirect('/home');
            } else {
              req.flash('error', 'usuario o contraseña incorrectos');
              res.redirect('/login');
            }
          }
        })
        .catch(error => {
          next(error);
        });
    }
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
