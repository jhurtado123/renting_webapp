const express = require('express');
const router = express.Router();
const { curly } = require('node-libcurl');


const Ad = require('../models/Ad');
const Chat = require('../models/Chat');
const User = require('../models/User');
const Appointment = require('../models/Appointment');


/* POST, COORDS AND PRICE OF ADS INSIDE A POLYGON */
router.post('/get/ads/points', (req, res, next) => {
  Ad.find().where('location').within({type: 'Polygon', coordinates: [req.body.polygon]}).select({'location': 1})
    .then(ads => {
      res.send({'ads': ads});
    })
    .catch(error => console.log(error));

});

/* POST, ADS INSIDE A POLYGON */
router.post('/get/ads', (req, res, next) => {
  Ad.find({}).where('location').within({type: 'Polygon', coordinates: [req.body.polygon]}).select({
    'coords': 1,
    'images': 1,
    'price': 1,
    'parameters': 1,
    'title': 1,
    'description': 1,
    'city': 1
  })
    .then(ads => {
      res.send({'ads': ads});
    })
    .catch(error => console.log(error));
});

/*POST, ORDER ADS */
router.post('/sort/ads', (req, res, next) => {
  const {order} = req.body;
  console.log(order)
  if (order === 'data') {
    Ad.find().sort({createdAt: -1})
      .then(ads => {
        res.send({'ads': ads})
      })
  } else if (order === 'morePrice') {
    Ad.find().sort({price: -1})
      .then(ads => {
        res.send({'ads': ads})
      })
      .catch(error => next(error));
  } else if (order === 'lessPrice') {
    Ad.find().sort({price: 1})
      .then(ads => {
        res.send({'ads': ads})
      })
      .catch(error => next(error));
  } else if (order === 'moreMeters') {
    Ad.find().sort({'parameters.square_meters': -1})
      .then(ads => {
        res.send({'ads': ads})
      })
      .catch(error => next(error));
  } else if (order === 'lessMeters') {
    Ad.find().sort({'parameters.square_meters': 1})
      .then(ads => {
        res.send({'ads': ads})
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
      res.send({ads: ads});
    })
    .catch(error => console.log(error));
});

/*CHECK IF USERS HAVE APPOINTMENTS ON DATE*/
router.post('/have/appointments', (req, res, next) => {
  const {chatId, dateTime} = req.body;
  console.log(dateTime);
  Chat.findOne({_id: chatId})
    .then(chat => {
      return Appointment.find({
        $or: [{'lesser': chat.lessee,'date': dateTime}, {'lesser': chat.lessor,'date': dateTime},{'lessor': chat.lessee,'date': dateTime},{'lessor': chat.lessor,'date': dateTime}]
      });
    })
    .then(appointments => {
      if (!appointments.length) {
        return res.send({'isPosible': true})
      }
      return res.send({'isPosible': false, 'message': 'Ya hay una cita concertada en esa fecha'})
    })
    .catch(err => console.log(err));
});


router.post('/create/appointment', (req, res, next) => {
  const {chatId, dateTime} = req.body;
  Chat.findOne({_id: chatId})
    .then(chat => {
       chat.hasAppointment = true;
      return chat.save();
    })
    .then(chat => {
      return new Appointment({lesser: chat.lessee, lessor: chat.lessor, date: dateTime, ad: chat.ad, status: 'Active', chat: chat._id }).save();
    })
    .then(appointment => {
      res.send({appointment});
    })
    .catch(err => console.log(err));

});

router.post('/get/fairPrice', (req, res, next)=>{
  let {flat_status, parking, storage_room, postal_code, height, hasElevator, terrace, square_meters} = req.body.data;
  console.log(flat_status)
  getSalaryByPostalCode(postal_code)
    .then(response=>{
      let basePrice = (response / 12) * 0.25;
      let meterPrice = (response / 12) * 0.003;
      let fairPrice = basePrice;
      if (!hasElevator && height >= 2) fairPrice-= 50;
      if(terrace) fairPrice += 50;
      if(parking) fairPrice += 75;
      if(storage_room) fairPrice += 25;
      if(square_meters && square_meters > 60) { fairPrice += ((square_meters-60)*meterPrice)}
      else if (square_meters && square_meters < 60) { fairPrice -= ((60 - square_meters) * meterPrice) 
      }
      switch (parseInt(flat_status)) {
        case 1:
          fairPrice -= (fairPrice * 0.1)
          break;
        case 2:
          fairPrice -= (fairPrice * 0.05)
          break;  
        case 4:
          fairPrice += (fairPrice * 0.05)
          break;
        case 5:
          fairPrice += (fairPrice * 0.1)
          break;   
        default:
          break;
      }
      return res.send({fairPrice})
    })
    .catch(error => console.log(error))
})

async function getSalaryByPostalCode(postal_code) {
  const url = `https://seguro.elpais.com/estaticos/2019/01/renta_codigos_postal/suggest.pl?q=${postal_code}&code=9`;
  const { data } = await curly.get(url);
  const response = getJsonFromResponse(data);

  return response !== '' ? parseInt(response.renta) : 22000;
}

function getJsonFromResponse(response) {
  response = response.split('[')[1];
  response = response.split(']')[0];

  return response === '' ? '' : JSON.parse(response);
}

module.exports = router;
