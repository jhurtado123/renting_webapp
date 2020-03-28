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
router.post("/:idAppointment/create", function(req, res) {
  const { title, stars, treatment, veracity, description } = req.body;
  const { idAppointment } = req.params; 
  let review = { title: title, stars: stars, treatment: treatment, veracity: veracity, description: description, userid: 1 }
  Appointment.findById(idAppointment)
    .then(result => {
      review.userid = result.lessor;
      User.find({ _id: result.lessor }).then(user => {
        console.log(review);
        User.review.push(review).then(resultUser => {
          User.save().then(resultUserUpdate => {
            return resultUserUpdate;
          })
        })
      })
    })
  .then(result =>
    res.resdirect("/home")
  )
  .catch(error => next(error));
});
module.exports = router;  