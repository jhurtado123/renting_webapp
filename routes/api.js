const express = require('express');
const router = express.Router();

const Ad = require('../models/Ad');

/* POST, COORDS AND PRICE OF ADS INSIDE A POLYGON */
router.post('/get/ads/points', (req, res, next) => {
  const {polygon} = req.body;
  const adsArray = [];
  Ad.find({}).select({'coords':1})
    .then(ads => {
      ads.forEach(ad => {
        if (areCoordsInsidePolygon([ad.coords.lng, ad.coords.lat], polygon)) adsArray.push(ad);
      });
      res.send({'ads': adsArray});
    })
    .catch(error => next(error));
});

/* POST, ADS INSIDE A POLYGON */
router.post('/get/ads', (req, res, next) => {
  const {polygon} = req.body;
  const adsArray = [];
  Ad.find({}).select({'coords':1, 'images': 1, 'price':1, 'parameters': 1, 'title': 1, 'description': 1, 'city':1})
    .then(ads => {
      ads.forEach(ad => {
        if (areCoordsInsidePolygon([ad.coords.lng, ad.coords.lat], polygon)) adsArray.push(ad);
      });
      res.send({'ads': adsArray});
    })
    .catch(error => next(error));
});

function areCoordsInsidePolygon(point, vs) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];

    const intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

module.exports = router;
