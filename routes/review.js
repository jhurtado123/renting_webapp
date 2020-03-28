const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* GET CREATE REVIEW */
router.get('/create', function (req, res, next) {
  res.render('review/create');
});

/* POST CREATE REVIEW */
router.post('/create', function (req, res, next) {
  const { title, stars, treatment, veracity, description } = req.body;
  console.log(title, stars, treatment, veracity, description);
});

module.exports = router;