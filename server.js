const camelCase = require('camelcase'); // test package installed

const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const getAge = require('get-age');
const arrayFind = require('array-find');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const upload = multer({
  dest: 'public/upload/'
});

require('dotenv').config();

mongoose
  .connect(
    'mongodb://localhost:27017/auth', {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Mongo Error:'));

var db = null;
var url = 'mongodb://localhost:27017/Project_Tech' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, {
  useNewUrlParser: true
}, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('You now have access to ' + url);
  }
  db = client.db(process.env.DB_NAME)
})

// //Testing data 
let accounts = [{
    id: 1,
    name: 'joan',
    age: '26',
    state: 'woman',
    email: 'joanpadolina@gmail.com',
    password: '1234',
    file: ''

  },
  {
    id: 2,
    name: 'jan',
    age: '27',
    state: 'man',
    email: 'janno@hotmail.com',
    password: '4321',
    file: ''
  }
];


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  res.render('pages/index');
});

// --------- Pages ------------//
app.get('/', function(req, res) {
  res.render('/pages/index')
});

// app.get('/profile', function(req, res) {
//   res.render('pages/profile');
// });

app.get('/list', function(req, res) {
  res.render('pages/list');
});


app.get('/register', function(req, res) {
  res.render('pages/register');
});

app.get('/:id', function(req, res) { // Rico 
  let obj;
  obj = accounts.find(obj => obj.id == req.params.id);
  res.render('pages/profile.ejs', {
    title: `Profile of ${obj.name}`,
    obj: obj
  });
  console.log(id);
});

// --------------  POST -------------// 

app.post('/register', upload.single('file'), function(req, res, next) {
  
    // ---- account toevoegen aan collectie moongo Compass ----//
  
  db.collection('account').insertOne({

      name: req.body.name,
      age: req.body.age,
      state: req.body.state,
      email: req.body.email,
      file: req.file ? req.file.filename : null, // if else
  }, done)

  function done(err, data ) {
    if (err) {
      console.log(next(err))
    } else {
      console.log(id+' is added to the database.');
      // res.redirect('/' + data.insertedId)

    }
  }
  
  
  console.log(req.body.name);
  let id = slug(req.body.name).toLowerCase();

  accounts.push({


    id: id,
    name: req.body.name,
    age: req.body.age,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password,
    file: req.file ? req.file.filename : null, // if else

  });
  // 
  // console.log(req.body);
  res.redirect('/' + id);
  




});

// --------- 404 ERROR ------------//

app.use(function(req, res) {
  res.status(404).render('pages/404');

});

//Start Server
///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function(request, response) {
  response.send('red')
});

app.listen(port, function() {
  console.log('De server staan aan!')
});