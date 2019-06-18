const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session');


router.get('/like', (req, res) => {
    const userId = req.session.user._id;
    let userLikes = [];
    User.findOne({ _id: userId }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                for(let i = 0; i < foundObject.likes.length; i++){
                    let objectId = foundObject.likes[i];
                    User.findOne({ _id: objectId }, (err, foundUser) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send()
                        } else {
                            if (!foundUser) {
                                console.log('User2 not found in like array')
                                res.status(404).send()
                            } else {
                                for(let x = 0; i < foundUser.likes.length; i++){
                                    if(foundUser.likes[i] === userId){
                                        userLikes.push(objectId)
                                    } else {
                                        console.log('This user does not like you back')
                                    }
                                }
                            }
                        }
                    })
                }
            }
        }
    })
});

router.post('/like', (req, res) => {
    const id = req.session.user._id;
    const userId = req.body.id;
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                for(let i =0; i<foundObject.likes.length;i++) {
                    if(userId == foundObject.likes[i]){
                        console.log('You already liked this user');
                        res.status(200).send()
                        res.redirect('/matches')
                        return
                    }
                }
                foundObject.likes.push(userId)
                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        console.log('user saved' + updatedObject)
                        res.status(200).send()
                        res.redirect('/matches')
                    }
                })
            }
        }
    })
});

module.exports = router;