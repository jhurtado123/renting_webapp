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
const fs = require('fs');

/*Management page*/
router.get('/management', (req, res, next) => {
    res.render('users/management');
});

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
router.get('/profile', (req, res, next) => {
  const { currentUser } = req.session;
  User.findById(currentUser._id)
    .then(user => {
      res.render('users/edit');
    })
    .catch(error => next(error));
});

router.post('/profile',  upload.any('photo'), (req, res, next) => {
  const updateProfile = req.body;
  const { currentUser } = req.session;
  if (updateProfile.lesseeMode && updateProfile.lesseeMode === 'on') {
    updateProfile.lesseeMode = currentUser.lesseeMode = true;
    currentUser.dni = updateProfile.dni;
  } else {
    updateProfile.dni = '';
  }
  currentUser.description = updateProfile.description;
  currentUser.name = updateProfile.name;
  currentUser.phone = updateProfile.phone;
  User.updateOne({ _id: currentUser._id }, updateProfile)
    .then(() => {
      res.redirect(`/users/${currentUser._id}`);
    })
    .catch(next);
});


/* GET user page. */
router.get('/:userId', (req, res, next) => {
  const { userId } = req.params;
  let matchUser;
  User.findById(userId)
    .then(user => {
      matchUser = user;
     return Ad.find({'owner': userId});
    })
    .then(ads =>  res.render('users/user', {'user': matchUser, ads}))
    .catch(next);
});



/* Delete user */
router.post('/:userid/delete', (req, res, next) => {
  const { currentUser } = req.session;
  User.findByIdAndDelete(currentUser._id)
    .then(() => {
      return res.redirect('/');
    })
    .catch(next);
});

/* POST UPLOAD IMAGE */
router.post('/api/uploadImage', upload.any('photo'), function (req, res, next) {
  req.session.currentUser.profile_image = req.files[0].filename;
  return res.json({filename: req.files[0].filename})
});
/* POST REMOVE IMAGE */
router.post('/api/removeImage', function (req, res, next) {
  const {image} = req.body;
  if (image === 'default-profileImage.png') return res.json({'ok': true});

  fs.unlinkSync(`./public/uploads/userProfileImages/${image}`)
    .then(res => {
      return res.json({'ok': true})
    })
    .catch(error => console.log(error));
  });

module.exports = router;
