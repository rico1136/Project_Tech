const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const bcrypt = require('bcrypt');
const saltRounds = 11;

router.post('/login', (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, (err, currentUser) => {
    console.log(currentUser)
    console.log(req.body.password)
    let password = bcrypt.compareSync(req.body.password, currentUser.password);
    if (password === true) {
      console.log('correct')
      req.session.user = currentUser;
      res.redirect(`/profile/${req.session.user._id}`)
    } else {
      console.log('incorrect')
    }
  });
});

router.get('/login', (req, res ) => {
  res.render('pages/login');
});

module.exports = router;
