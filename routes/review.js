const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Appointment = require("../models/Appointment");

/* GET CREATE REVIEW */
router.get('/:idAppointment/create', function (req, res, next) {
  const { idAppointment } = req.params 
  res.render("review/create", { idAppointment });
});

/* POST CREATE REVIEW */
router.post("/:idAppointment/create", function(req, res, next) {
  const { title, stars, treatment, veracity, description } = req.body;
  const { idAppointment } = req.params; 
  let review = { title: title, stars: stars, treatment: treatment, veracity: veracity, description: description, userid: 1 }
  Appointment.findById(idAppointment)
    .then(async result => {
      review.userid = result.lesser;
      await User.findOne({ _id: result.lessor })
        .then(async user => {
        await user.reviews.push(review)
        user.save()
        })
      res.redirect("/home");
      })
    .catch(error => next(error));
});

module.exports = router;  