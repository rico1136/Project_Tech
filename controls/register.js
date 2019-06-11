const express  = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb'); //https://www.mongodb.com/
const multer = require('multer'); //https://www.npmjs.com/package/multer
const slug = require('slug'); //https://www.npmjs.com/package/slug

// foto's opslaan in een map //
const upload = multer({
  dest: 'public/upload'
});

// ---- CMD-BT Slides MongoDB ---//

// var db = null;
// var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

// mongo.MongoClient.connect(url, {
//   useNewUrlParser: true
// }, function(err, client) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('You now have access to ' + url);
//   }
//   db = client.db(process.env.DB_NAME)
// })

router.post('/register', upload.single('file'), function(req, res, next) {
  //slugify url friendly
  let id = slug(req.body.name).toLowerCase()
  // ---- account toevoegen aan collectie moongo Compass ----//

  db.collection('account').insertOne({
    name: req.body.name,
    age: req.body.age,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password,
    file: req.file ? req.file.filename : null, // if else
  }, done)

  function done(err, data) {
    if (err) {
      console.log(next(err))
    } else {
      console.log(id + ' is added to the database.');
      res.redirect('/profile/' + data.insertedId)

    }
  }
}
)
module.exports=router;