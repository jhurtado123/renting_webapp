require('dotenv').config();

const session = require('express-session');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo")(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
var hbs = require('hbs');
const extend = require('handlebars-extend-block');
const authMiddleware = require('./helpers/auth');


hbs = extend(hbs);

const app = module.exports = express();
app.io = require('socket.io')();
require('express-dynamic-helpers-patch')(app);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/ad');
const appointmentsRouter = require('./routes/appointment');
const chatsRouter = require('./routes/chat');
const supportRouter = require('./routes/support');
const apiRouter = require('./routes/api');
const reviewRouter = require('./routes/review');


mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: new Date(Date.now() + (60 * 1000 * 30)) }}));
app.use(flash());

app.use(session({
  secret: "renting-app-secret",
  cookie: { maxAge: new Date(Date.now() + (60 * 1000 * 30)) }, // 60 seconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    resave: true,
    saveUninitialized: false,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use('/', indexRouter);

app.dynamicHelpers({
  currentUser: function (req, res) {
    return req.session.currentUser;
  },
});

app.use('/users',authMiddleware.checkIfUserLoggedIn, usersRouter);
app.use('/ad',authMiddleware.checkIfUserLoggedIn, adsRouter);
app.use('/appointment', authMiddleware.checkIfUserLoggedIn, appointmentsRouter);
app.use('/chats', authMiddleware.checkIfUserLoggedIn, chatsRouter);
app.use('/support', authMiddleware.checkIfUserLoggedIn, supportRouter);
app.use('/review', authMiddleware.checkIfUserLoggedIn, reviewRouter);

app.use('/api', apiRouter); //TODO authMiddleware.checkIfUserLoggedIn ?

//register partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('ifEq', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("formatDate", function(datetime) {
    return `${datetime.getUTCDate()}/${datetime.getUTCMonth()+1}/${datetime.getFullYear()}`;
});
hbs.registerHelper("formatHours", function(datetime) {
  return `${datetime.getHours()}:${datetime.getMinutes()}`;
});
hbs.registerHelper('switch', function(value, options) {
  this.switch_value = value;
  return options.fn(this);
});
hbs.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);

  if (res.statusCode === 500) res.render('error500');
  res.render('error');
});

module.exports = app;
