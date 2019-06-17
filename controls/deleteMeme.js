const User = require('./userschema');
const express  = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.post('/delete',(req, res) => {
        const id = req.session.user._id;
        const meme = req.body.meme
        User.findOne({ _id: id }, (err, foundObject) => {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (!foundObject) {
                    console.log('User not found in database')
                    res.status(404).send()
                } else {
                    const memesrc = foundObject.memes.indexOf(meme);
                    if(memesrc > -1) {
                        foundObject.memes.splice(memesrc, 1);
                        console.log(foundObject.memes)
                    }
                    foundObject.save((err, updatedObject) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send()
                        } else {
                            console.log('user saved' + updatedObject)
                            res.status(200).send()
                            res.redirect('profile')
                        }
                    })
                }
            }
        })
    }
);

module.exports = router;