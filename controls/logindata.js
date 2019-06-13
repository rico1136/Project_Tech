const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.post('/login', function (req, res, next) {
  User.findOne({email: req.body.email, password: req.body.password}, function (err, currentUser) {
    if (err) {
      next(err)
    }else {
      req.session.user = currentUser;
      res.redirect(`/profile/${req.session.user._id}`)
    }
  });
});

module.exports = router;
