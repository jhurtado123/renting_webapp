const express = require('express');
const User = require('../models/User');
const Ad = require('../models/Ad');
const Appointment = require('../models/Appointment');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/userProfileImages");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


/*List user ads*/
router.get('/ads', (req, res, next) => {
  const userId = req.session.currentUser._id;

  Ad.find({'owner': userId})
    .then(ads => {
      res.render('users/ads', {ads});
    })
    .catch(error => next(error));
});

/*List user apppointments*/
router.get('/appointments', (req, res, next) => {
  const userId = req.session.currentUser._id;
  Appointment.find({$or:[ {'lesser':userId}, {'lessor':userId}]}).populate('ad lesser lessor')
    .then(appointments => res.render('appointments/list', {appointments}))
    .catch(error => next(error));
});

/* Edit user page */
router.get('/edit', (req, res, next) => {
  const { currentUser } = req.session;
  User.findById(currentUser._id)
    .then(user => {
      res.render('users/edit');
    })
    .catch(error => next(error));
});

router.post('/edit',  upload.any('photo'), (req, res, next) => {
  const updateProfile = req.body;
  updateProfile.profile_image = req.files[0].filename ;
  const { currentUser } = req.session;
  currentUser.profile_image = req.files[0].filename;
  currentUser.description = updateProfile.description;
  currentUser.name = updateProfile.name;
  currentUser.dni = updateProfile.dni;
  User.updateOne({ _id: currentUser._id }, updateProfile)
    .then(() => {
      res.redirect('/users/user');
    })
    .catch(next);
});


/* GET user page. */
router.get('/:userid', (req, res, next) => {
  const { currentUser } = req.session;
  User.findById(currentUser._id)
    .then(users => {
      res.render('users/user', {
        currentUser,
      });
    })
    .catch(next);
});



/* Delete user */
router.post('/:userid/delete', (req, res, next) => {
  const { currentUser } = req.session;
  User.findByIdAndDelete(currentUser._id)
    .then(() => {
      res.redirect('/register');
    })
    .catch(next);
});


module.exports = router;
