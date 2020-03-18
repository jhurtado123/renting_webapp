const express = require('express');
const User = require('../models/User');
const Ad = require('../models/Ad');
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

/* Edit user page */
router.get('/:userid/edit', (req, res, next) => {
  const { currentUser } = req.session;
  User.findById(currentUser._id)
    .then(user => {
      res.render('users/edit', {
        currentUser,
      });
    })
    .catch(error => next(error));
});

router.post('/:userid/edit',  upload.any('photo'), (req, res, next) => {
  const updateProfile = req.body;
  updateProfile.profile_image = req.files[0].filename;
  const { currentUser } = req.session;
  currentUser.profile_image = req.files[0].filename;
  currentUser.description = updateProfile.description;
  currentUser.name = updateProfile.name;
  currentUser.dni = updateProfile.dni;
  User.updateOne({ _id: currentUser._id }, updateProfile)
    .then(() => {
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

/*List user ads*/
router.get('/:userId/ads', (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  const paramsId = req.params.userId;

  if (currentUserId !== paramsId) next();
  Ad.find({'owner': paramsId})
    .then(ads => {
      res.render('users/ads', {ads});
    })
    .catch(error => next(error));
});

module.exports = router;
