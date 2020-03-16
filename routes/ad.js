const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/picturesAd')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
const fs = require('fs');

const Ad = require('../models/Ad');

/* GET CREATE AD */
router.get('/create', function(req, res, next) {
  res.render('ad/create');
});
/* POST CREATE AD */
router.post('/create',function(req, res, next) {
  const {title, city, postal_code, address, square_meters, flat_status, price, images, description, terrace} = req.body;
  getCoordsByAddress(address, city)
    .then(coords => {
      return new Ad({
        title,
        owner: req.session.currentUser._id,
        address,
        city,
        postal_code,
        price,
        coords,
        description,
        parameters: {
          square_meters, flat_status, terrace
        },
        images
      }).save();
    })
    .then(result => {

    })
    .catch(error => console.log(error));
});

/* GET VIEW AD */
router.get('/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(ad => {
      if (!ad) next();
      res.render('ad/view', {ad});
    })
    .catch(error => console.log(error) );
});

/*GET EDIT AD*/
router.get('/edit/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(ad => {
      if (!ad) next();

      res.render('ad/edit', {ad});
    })
    .catch(error => console.log(error));
});
router.post('/edit/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(async ad => {
      if (!ad) next();
      const {title, city, postal_code, address, square_meters, flat_status, price, images, description, terrace} = req.body;
      ad.title = title;
      ad.city = city;
      ad.postal_code = postal_code;
      ad.coords = ad.address !== address ? await getCoordsByAddress(address, city) : ad.coords;
      ad.address = address;
      ad.parameters = { square_meters, flat_status, terrace };
      ad.description = description;
      ad.images = images;
      ad.price = price;

      return ad.save();
    })
    .then(result => res.redirect(`/ad/${req.params.adId}`))
    .catch(error => console.log(error));
});

/* POST UPLOAD IMAGE */
router.post('/api/uploadImage', upload.any('photo'), function(req, res, next) {
  return res.json({filename: req.files[0].filename})
});
/* POST REMOVE IMAGE */
router.post('/api/removeImage', function(req, res, next) {
  const {image} = req.body;
  fs.unlinkSync(`./public/uploads/picturesAd/${image}`);

  return res.json({'ok': true});
});


//GET COORDINATES FROM ADDRESS NAME
async function getCoordsByAddress(address, city) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}, ${city}.json?access_token=pk.eyJ1Ijoiamh1cnRhZG8xMjMiLCJhIjoiY2s3dGlqZWtlMHFveTNvbjF1bjJxYTg2ayJ9.zbzGWyoeQ52ddJTrK2gjdA&limit=1&country=es`

  return await axios.get(url)
    .then(response => {
      return {
        lat: response.data.features[0].center[1],
        lng: response.data.features[0].center[0]
      };
    });
}

module.exports = router;
