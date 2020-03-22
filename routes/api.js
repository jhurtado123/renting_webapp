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

/*POST, ORDER ADS */
router.post('/sort/ads', (req, res, next) => {
  const {order} = req.body;
  console.log(order)  
  if (order === 'data'){
    Ad.find().sort({createdAt: -1})
      .then(ads => {
        res.send({ 'ads': ads   })
      })
  } else if(order === 'morePrice'){
    Ad.find().sort({ price: -1 })
      .then(ads => {
        res.send({ 'ads': ads })
      })
      .catch(error => next(error));
  } else if (order === 'lessPrice'){
    Ad.find().sort({ price: 1 })
      .then(ads => {
        res.send({ 'ads': ads })
      })
      .catch(error => next(error));
  } else if(order === 'moreMeters'){
    Ad.find().sort({ 'parameters.square_meters': -1})
      .then(ads => {
        res.send({ 'ads': ads })
      })
      .catch(error => next(error));
  } else if (order === 'lessMeters') {
    Ad.find().sort({ 'parameters.square_meters': 1 })
      .then(ads => {
        res.send({ 'ads': ads })
      })
      .catch(error => next(error));
  }  
});

/* POST, FILTER ADS*/
router.post('/filter/ads', (req, res) => {
  const filter = req.body;
  let query = {
    price: {$gte: filter.filter.price},
    "parameters.square_meters": {$gte: filter.filter.meters},
    "parameters.rooms": {$gte: filter.filter.rooms},
    "parameters.bathrooms": {$gte: filter.filter.wc}
  };
  if (filter.filter.parking) query["parameters.parking"] = true;
  if (filter.filter.terrace) query["parameters.terrace"] = true;
  if (filter.filter.elevator) query["parameters.hasElevator"] = true;
  if (filter.filter.storage) query["parameters.storage_room"] = true;
  console.log(query);

  Ad.find(query)
    .then(ads => {
      res.send({ ads: ads });
    })
    .catch(error => console.log(error));
});

module.exports = router;
