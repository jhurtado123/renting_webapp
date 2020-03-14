const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

/* GET CREATE AD */
router.get('/create', function(req, res, next) {
  res.render('ad/create');
});

module.exports = router;
