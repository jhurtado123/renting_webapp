const express = require('express');
const router = express.Router();

const Ad = require('../models/Ad');

/* POST, COORDS AND PRICE OF ADS INSIDE A POLYGON */
router.post('/get/ads/points', (req, res, next) => {
  Ad.find().where('location').within({type: 'Polygon', coordinates: [req.body.polygon]}).select({'location':1})
    .then(ads => {
      res.send({'ads': ads});
    })
    .catch(error => console.log(error));

});

/* POST, ADS INSIDE A POLYGON */
router.post('/get/ads', (req, res, next) => {
  Ad.find({}).where('location').within({type: 'Polygon', coordinates: [req.body.polygon]}).select({'coords': 1, 'images': 1, 'price': 1, 'parameters': 1, 'title': 1, 'description': 1, 'city': 1})
    .then(ads => {
      res.send({'ads': ads});
    })
    .catch(error => console.log(error));
});


module.exports = router;
