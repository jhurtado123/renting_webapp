const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Rent App', layout: false });
});

router.post('/login', (req, res, next) => {
  const { username, userPassword } = req.body;
    if (username === '' || userPassword === '') {
      req.flash('error', 'no pueden estar vacios');
      res.redirect('/');
    } else {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            req.flash('error', 'no estas registrado');
            res.redirect('/');
          } else {
            console.log(bcrypt.compareSync(userPassword, user.password));
            if (bcrypt.compareSync(userPassword, user.password)) {
              req.session.currentUser = user;
              req.flash('info', 'Welcome to Rent App!');
              res.redirect('/home');
            } else {
              req.flash('error', 'usuario o contraseña incorrectos');
              res.redirect('/');
            }
          }
        })
        .catch(error => {
          next(error);
        });
    }
});

/*Logout*/
router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }
    res.redirect('/login');
  });
});


/*Register page*/
router.get('/register', (req, res, next) => {
  res.render('register', {messages: req.flash(), layout: false});
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

router.get('/home', (req, res, next) => {
  if(req.query.search) {
    if(isNaN(req.query.search)){
      Ad.find()
        .then(ads => {
          console.log(ads)
          if(ads.length > 0){
            res.render('home', {
              ads,
              messages: req.flash()
            });  
          } else {
            console.log("hola")
            req.flash('error', 'No hay anuncios en este código postal');
            res.redirect('/home');
          }
        })
        .catch(err => console.log('Error while getting ads ', err))
    } else{
      Ad.find({ postal_code: req.query.search })
        .then(ads => {
          console.log(ads)
          if(ads.length > 0){
            res.render('home', {
              ads,
              messages: req.flash()
            });  
          } else {
            console.log("hola")
            req.flash('error', 'No hay anuncios en este código postal');
            res.redirect('/home');
          }
        })
        .catch(err => console.log('Error while getting ads ', err))
    }
  } else {
    Ad.find()
      .then(ads => {
          res.render('home', {
            ads,
            messages: req.flash() 
          });
      })
      .catch(err => console.log('Error while getting ads ', err))
  }
});


module.exports = router;
