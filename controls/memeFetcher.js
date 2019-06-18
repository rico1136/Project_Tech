const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const fetch = require('node-fetch');

router.post('/meme', (req, res) => {
    const id = req.session.user._id;
    let memesrc = req.body.src;
    User.findOne({ _id: id }, (err, foundObject) => {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                console.log('User not found in database')
                res.status(404).send()
            } else {
                for(let i =0; i<foundObject.memes.length;i++) {
                    if(memesrc == foundObject.memes[i]){
                        console.log('You already liked this meme');
                        res.status(200).send()
                        res.redirect('memetest')
                        return
                    }
                }
                foundObject.memes.push(memesrc)
                foundObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        console.log('user saved' + updatedObject)
                        res.status(200).send()
                        res.redirect('memetest')
                    }
                })
            }
        }
    })
});

router.get('/memetest', (req, res) => {
    if (!req.session.user){
        res.redirect('/login');
        return
    }
    randommeme();
    res.render('pages/memetest', { memesrc: memesrc })
});

let memesrc = 'https://i.redd.it/jtxgfmm95h331.jpg'; //placeholder
const randommeme = () => {
    fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {
            memesrc = json.url;
            return memesrc;
        });
};

module.exports = router;