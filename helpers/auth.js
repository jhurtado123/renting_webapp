function checkIfUserLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    req.flash('requestedUrl', req.originalUrl);
    return res.redirect('/');
  }
}

module.exports = {
  checkIfUserLoggedIn,
};