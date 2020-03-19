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

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/ad');

const app = express();
require('express-dynamic-helpers-patch')(app);

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
  }
});
//authmiddleware
app.use(authMiddleware.checkIfUserLoggedIn);
app.use('/users',  usersRouter);
app.use('/ad',  adsRouter);

//register partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('ifEq', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
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
