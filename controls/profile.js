const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.get('/profile/:id', function profile (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
        return
    }
    User.findOne({_id : req.params.id}, function (err, profile) {
        if (err) {
            throw(err);
        } else {
            res.render('pages/profile', {data: profile, user: req.session.user})
        }
    });
});

module.exports = router;




