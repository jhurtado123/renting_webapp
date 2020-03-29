const express = require('express');
const router = express.Router();
const { curly } = require('node-libcurl');


const Ad = require('../models/Ad');
const Chat = require('../models/Chat');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const getFairPrice = require('../helpers/getFairPrice');
const createNotifications = require('../helpers/notifications');


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
    'city': 1,
    'neighborhood':1,
    'fairPrice': 1,
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
      createNotifications([appointment.lesser, appointment.lessor], {'title': 'Tienes una nueva cita!', 'href': `/appointment/view/${appointment._id}`});
      res.send({appointment});
    })
    .catch(err => console.log(err));

});

router.post('/notifications/read', (req,res,next) => {
  User.findOne({'_id': req.session.currentUser._id})
    .then(user => {
      user.notifications.forEach(notification => notification.isReaded = true);
      return user.save();
    })
    .then(res => res.send({'response' : true}))
    .catch(err => console.log(err));
});


router.post('/get/fairPrice', (req, res, next) =>{
  getFairPrice(req.body.data)
  .then(fairPrice => {
    res.send({fairPrice})
    });
});

router.post('/addToFavorites/:adId', (req, res, next) => {
  console.log(req.params.adId);
  User.findOne({'_id': req.session.currentUser._id})
    .then(user => {
      user.favorites.push(req.params.adId);
      return user.save();
    })
    .then(user => {
      req.session.currentUser = user;
      res.send({'status': 'ok'});
    })
    .catch(err => console.log(err));
});

router.post('/removeFromFavorites/:adId', (req, res, next) => {
  User.findOne({'_id': req.session.currentUser._id})
    .then(user => {
      user.favorites = user.favorites.filter(element => {
        return element+'' !== req.params.adId+'';
      });
      return user.save();
    })
    .then(user => {
      req.session.currentUser = user;
      res.send({'status': 'ok'});
    })
    .catch(err => console.log(err));
});



module.exports = router;
