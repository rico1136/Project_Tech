const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.get('/profile/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return
    }
    User.findOne({_id : req.params.id}, (err, profile) => {
        if (err) {
            throw(err);
        } else {
            res.render('pages/profile', {data: profile, user: req.session.user})
        }
    });
});

router.get('/profile', (req, res) => {
    if (!req.session.user){
        res.redirect('/login');
        return
    }
    res.redirect(`/profile/${req.session.user._id}`);
});


router.get('/userprofile/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
        return
    }
    User.findOne({_id : req.params.id}, (err, profile) => {
        let like = false;
        if (err) {
            throw(err);
        } else {
            for(let x = 0;x<req.session.user.likes.length;x++){
                console.log(req.session.user.likes[x])
                if(req.session.user.likes[x] == profile._id ){
                    console.log('liked by current user')
                    for(let i = 0;i<profile.likes.length;i++){
                        if(profile.likes[i] == req.session.user._id) {
                            console.log('liked by other user')
                            like = true;
                        }
                    }
                } else {
                    like = false;
                }
            }
            res.render('pages/userprofile', {data: profile, user: req.session.user, liked: like})
        }
    });
});

module.exports = router;




