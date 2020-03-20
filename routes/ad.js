const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const {curly} = require('node-libcurl');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/picturesAd')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({storage: storage});
const fs = require('fs');

const Ad = require('../models/Ad');

/* GET CREATE AD */
router.get('/create', function (req, res, next) {
  res.render('ad/create');
});
/* POST CREATE AD */
router.post('/create', function (req, res, next) {
  const {
    title, city, postal_code, address,
    square_meters, flat_status, price, images,
    description, terrace, rooms, bathrooms,
    height, storage_room, parking, number
  } = req.body;

  getCoordsByAddress(address + ' ' + number + ', ' + postal_code, city)
    .then(async coords => {
      const neighborhood = await getNeighborhoodByPostalCode(postal_code);
      return new Ad({
        title,
        owner: req.session.currentUser._id,
        neighborhood: neighborhood === '' ? city : neighborhood,
        address, number, city, postal_code, price, description,
        location: {
          type: 'Point',
          coordinates: coords
        },
        parameters: {
          square_meters, flat_status,
          terrace: terrace === 'on',
          rooms, bathrooms, height,
          storage_room: storage_room === 'on',
          parking: parking === 'ok'
        },
        images
      }).save();
    })
    .then(result => {
      res.redirect('/users/ads')
    })
    .catch(error => next(error));
});

/* GET VIEW AD */
router.get('/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(ad => {
      if (!ad) next();
      res.render('ad/view', {ad});
    })
    .catch(error => next(error));
});

/*GET EDIT AD*/
router.get('/edit/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(ad => {
      if (!ad) next();

      res.render('ad/edit', {ad});
    })
    .catch(error => next(error));
});
router.post('/edit/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(async ad => {
      if (!ad) next();
      const {
        title, city, postal_code, address, square_meters, flat_status, price, images, description, terrace, rooms, bathrooms,
        height, storage_room, parking, number
      } = req.body;

      if (postal_code !== ad.postal_code) {
        const neighborhood = await getNeighborhoodByPostalCode(postal_code);
        ad.neighborhood = neighborhood === '' ? ad.city : neighborhood;
      }
      ad.title = title;
      ad.city = city;
      ad.postal_code = postal_code;
      if (address !== ad.address) {
        ad.location = {
          type: 'Point',
          coordinates: await getCoordsByAddress(address + ' ' + number + ', ' + postal_code, city)
        }
      }
      ad.address = address;
      ad.parameters = {
        square_meters, flat_status,
        terrace: terrace === 'on',
        rooms, bathrooms, height,
        storage_room: storage_room === 'on',
        parking: parking === 'ok'
      };
      ad.description = description;
      ad.images = images;
      ad.price = price;
      ad.number = number;

      return ad.save();
    })
    .then(result => res.redirect(`/ad/${req.params.adId}`))
    .catch(error => next(error));
});

router.post('/remove/:adId', (req, res, next) => {
  Ad.findOne({_id: req.params.adId})
    .then(ad => {
      if (!ad) next();
      return ad.remove()
    })
    .then(result => res.redirect('/home'))
    .catch(error => next(error));
});

/* POST UPLOAD IMAGE */
router.post('/api/uploadImage', upload.any('photo'), function (req, res, next) {
  return res.json({filename: req.files[0].filename})
});
/* POST REMOVE IMAGE */
router.post('/api/removeImage', function (req, res, next) {
  const {image} = req.body;
  fs.unlinkSync(`./public/uploads/picturesAd/${image}`);

  return res.json({'ok': true});
});


//GET COORDINATES FROM ADDRESS NAME
async function getCoordsByAddress(address, city) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}, ${city}.json?access_token=pk.eyJ1Ijoiamh1cnRhZG8xMjMiLCJhIjoiY2s3dGlqZWtlMHFveTNvbjF1bjJxYTg2ayJ9.zbzGWyoeQ52ddJTrK2gjdA&limit=1&country=es`

  return await axios.get(url)
    .then(response => {
      return [
        response.data.features[0].center[0],
        response.data.features[0].center[1]
      ];
    });
}

async function getNeighborhoodByPostalCode(postal_code) {
  const url = `https://seguro.elpais.com/estaticos/2019/01/renta_codigos_postal/suggest.pl?q=${postal_code}&code=9`;
  const {data} = await curly.get(url);
  const response = getJsonFromResponse(data);

  return response !== '' ? response.zona : '';
}

function getJsonFromResponse(response) {
  response = response.split('[')[1];
  response = response.split(']')[0];

  return response === '' ? '' : JSON.parse(response);
}

module.exports = router;
