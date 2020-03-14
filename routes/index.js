var express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

var router = express.Router();
const saltRounds = 10;

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
module.exports = router;
