const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer'); //https://www.npmjs.com/package/multer
const slug = require('slug'); //https://www.npmjs.com/package/slug
const user = require('./userschema')

// foto's opslaan in een map //
const upload = multer({
  dest: 'public/upload'
});

// router.post('/register', upload.single('file'), function(req, res, next) {
//   //slugify url friendly
//   let id = slug(req.body.name).toLowerCase()
//   // ---- account toevoegen aan collectie moongo Compass ----//

router.post('/register', upload.single('profilePic'), function (req, res) {
  const newuser = new user()
  newuser.name = req.body.name
  newuser.age = req.body.age
  newuser.sex = req.body.sex
  newuser.email = req.body.email
  newuser.password = req.body.password
  newuser.memeCategory = req.body.memeCategory

  newuser.save(function (err, savedUser) {
    if (err) {
      console.log(err)
      // req.flash('failedRegister', `De verplichte invulvelden (*) zijn onjuist ingevuld of de email is al geregistreerd. Probeer opnieuw.`)
      // res.redirect('/create-account')
      return res.status(500).send
    } else {
      // req.flash('succesRegister', `User succesfully registered!`)
      // res.redirect('/profile-overview')
      console.log('Gelukt!')
      console.log(savedUser)
      return res.status(200).send
    }
  })
})

module.exports = router;
