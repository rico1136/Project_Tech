const express = require('express')
const router = express.Router()
const User = require('./userschema')

/*  When the url /update is hit, the function bellow will get the user id through the input field. Then it will check if the id matches
an object (user) in the databse. If it does, it will take that object and replace all properties with the matching input fields. But only
if they are filled in. Then it will save this new object which will override the existing one. At last, the profile-overview
page will be rendered again with the freshly updated data.  */
router.post('/updateFunction', (req, res) => {
  console.log('running');
  const id = req.session.user._id
  User.findOne({ _id: id }, (err, foundObject) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        console.log('User not found in database')
        res.status(404).send()
      } else {
        console.log('user found: ', foundObject)
        if (req.body.name) {
          foundObject.name = req.body.name
        } if (req.body.age) {
          foundObject.age = req.body.age
        } if (req.body.sex) {
          foundObject.sex = req.body.sex
        } if (req.body.email) {
          foundObject.email = req.body.email
        } if (req.body.password) {
          foundObject.password = req.body.password
        } if (req.body.profilePic) {
          foundObject.profilePic = req.body.profilePic
        } if (req.body.memeCategory) {
          foundObject.memeCategory = req.body.memeCategory
        }
        foundObject.save((err, updatedObject) => {
          console.log('updatedObject: ', updatedObject)
          if (err) {
            console.log(err)
            res.status(500).send()
          } else {
            res.render('pages/profile', {
              data: updatedObject
            })
          }
        })
      }
    }
  })
});

router.get('/update', (req, res) => {
  if (!req.session.user){
    res.redirect('/login');
    return
  }
  res.render('pages/update', {user: req.session.user});
});

module.exports = router;
