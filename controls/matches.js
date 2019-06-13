const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.get('/matches', function (req, res, next){
  if (!req.session.user){
    res.redirect('/login');
    return
  }
  
    User.find({ _id: {$ne: req.session.user._id},
    }, function (err, profiles) {
        res.render('pages/matches', {profiles : profiles, currentUser : req.session.user})
    });
});

module.exports = router;




