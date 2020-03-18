function checkIfUserLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    req.flash('requestedUrl', req.originalUrl);
    res.redirect('/');
  }
}

module.exports = {
  checkIfUserLoggedIn,
};