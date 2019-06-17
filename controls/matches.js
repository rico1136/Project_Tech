const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.get('/matches', (req, res, next) => {
    if (!req.session.user){
        res.redirect('/login');
        return
    }
    User.findOne({
        _id: req.session.user._id
    }, (err, user) => {
        matchtesttype = user.memeCategory;
        console.log(matchtesttype);
        User.find({ memeCategory : matchtesttype ,_id: {$ne: req.session.user._id},
        }, (err, profiles) => {
            res.render('pages/matches', {profiles : profiles, currentUser : req.session.user})
        });
    });
});

module.exports = router;




