const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));

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
                        res.status(200).send()
                        res.redirect('/matches')
                    }
                })
            }
        }
    })
});

router.post('/dislike',(req, res) => {
    const id = req.session.user._id;
    const userId = req.body.userid
    console.log(userId)
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                const userIndex = foundObject.likes.indexOf(userId);
                if(userIndex > -1) {
                    foundObject.likes.splice(userIndex, 1);
                    console.log(foundObject.likes)
                }
                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        console.log('user saved' + updatedObject)
                        res.status(200).send()
                        res.redirect('matches')
                    }
                })
            }
        }
    })
}
);

module.exports = router;