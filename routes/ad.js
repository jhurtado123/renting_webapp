const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

const Ad = require('../models/Ad');

/* GET CREATE AD */
router.get('/create', function(req, res, next) {
  res.render('ad/create');
});
/* POST CREATE AD */
router.post('/create', function(req, res, next) {
  console.log(req.body);
});


/* POST UPLOAD IMAGE */
router.post('/api/uploadImage', upload.any('photo'), function(req, res, next) {
  return res.json({filename: req.files[0].filename})
});

module.exports = router;
