const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer'); //https://www.npmjs.com/package/multer
const slug = require('slug'); //https://www.npmjs.com/package/slug
const user = require('./userschema')
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 11;

let storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/upload/'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace() + file.originalname)
    }
});

// foto's opslaan in een map //
const upload = multer({ storage:storage })
// router.post('/register', upload.single('file'), function(req, res, next) {
//   //slugify url friendly
//   let id = slug(req.body.name).toLowerCase()
//   // ---- account toevoegen aan collectie moongo Compass ----//
router.post('/register', upload.single('profilePic'), (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    const newuser = new user();
    newuser.name = req.body.name;
    newuser.age = req.body.age;
    newuser.sex = req.body.sex;
    newuser.email = req.body.email;
    newuser.password = hash;
    newuser.profilePic = req.file ? ('/upload/' + req.file.filename) : null,
    newuser.memeCategory = req.body.memeCategory;

    newuser.save( (err, savedUser) => {
        if (err) {
            console.log(err);
            // req.flash('failedRegister', `De verplichte invulvelden (*) zijn onjuist ingevuld of de email is al geregistreerd. Probeer opnieuw.`)
            // res.redirect('/create-account')
            return res.status(500).send
        } else {
            // req.flash('succesRegister', `User succesfully registered!`)
            // res.redirect('/profile-overview')
            console.log('Gelukt!');
            console.log(savedUser);
            req.session.user = savedUser;
            res.redirect(`/memecategory`);
        }
    })
});

router.get('/register', (req, res ) => {
    res.render('pages/register');
});


module.exports = router;
