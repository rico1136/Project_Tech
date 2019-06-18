const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (err, currentUser) => {
    if (err) {
      res.redirect('/register');
      next(err)
    } else {
      req.session.user = currentUser;
      res.redirect(`/profile/${req.session.user._id}`)
    }
  });
});

router.get('/login', (req, res ) => {
  res.render('pages/login');
});

module.exports = router;