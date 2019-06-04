const camelCase = require('camelcase'); // test package installed
const express = require('express'); //https://expressjs.com/
const app = express();
const port = process.env.PORT ||  3000;
const dotenv = require('dotenv'); //https://www.npmjs.com/package/dotenv
const slug = require('slug'); //https://www.npmjs.com/package/slug
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const multer = require('multer'); //https://www.npmjs.com/package/multer
const arrayFind = require('array-find'); //https://www.npmjs.com/package/array-find
const mongo = require('mongodb'); //https://www.mongodb.com/
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const validator = require('express-validator');
require('dotenv').config(); // gegeven voor de mongodb server


// == data accounts array == //

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
  },
  {
    id: 3,
    name: 'jess',
    age: '27',
    state: 'man',
    email: 'janno@hotmail.com',
    password: '4321',
    file: ''
  }
];

// foto's opslaan in een map //
const upload = multer({
  dest: 'public/upload'
});

// ---- CMD-BT Slides MongoDB ---//

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

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

// express engine //
app.set('view engine', 'ejs');


// session //
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: true
  }
}))
app.use(bodyParser.urlencoded({
  extended: true
}));
// routing van de pagina's //

app.get('/', index);
app.use(express.static('public'));
// app.get('/login', login);
app.get('/profile/:id', findProfile);
app.get('/profile', ownProfile);
app.get('/matchprofile', matchProfile);
app.get('/list', listPage);
app.get('/feed', feedList)
app.get('/register', register);
app.get('/login', login)
app.get('/matchprofile/:id', getmatch);

app.post('/register', upload.single('file'), addRegis);
app.post('/profile/:id', addRegis);
app.post('/login', loginData);


// leest de form en slaat het op in een js code


app.use(errNotFound);


app.listen(8000);


app.listen(port, servermsg);

//--- pagina render---//

function index(req, res) {
  res.render('pages/index');
}

function register(req, res, next) {
  res.render('pages/register');
}

function login(req, res) {
  // req.session.user = accounts[0].name;
  // if(req.session.user) {
  //   res.render('pages/login');  
  // } else {
  //   res.redirect(401).send('Geen session!')
  // }
  // console.log(req.session);
  res.render('pages/login');

}

function ownProfile(req, res) {
  res.render('pages/profile');
}

function matchProfile(req, res) {
  res.render('pages/matchprofile')
}

function listPage(req, res) {
  res.render('pages/list');
}

function matchFeed(req, res) {
  res.render('pages/feed');
}

function dbCollect(req, res, next) { // require, response, alles tussen de req en res (middleware)
  db.collecction('account');
}


// mongodb 

function addRegis(req, res, next) {
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

function loginData(req, res, next) {
  const password = req.body.password;
  const email = req.body.email;
  db.collection('account').findOne({
    email: req.body.email,
    password: req.body.password
  }, done);

  function done(err, data) {
    if (!data) {
      res.send('Email wordt niet herkend')
    } else {
      if(email === data.email){
        req.session.user = {name: data._id}
        res.redirect('/feed')
      }else{
        res.status(401).send('Account wordt niet herkend')
      }
    }
  }
  console.log(password)

}


function findProfile(req, res, next) {
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)


  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('pages/profile.ejs', {
        data: data,
      })
    }
  }
}

function getmatch(req, res, next) {
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)


  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('pages/matchprofile.ejs', {
        data: data
      })
    }
  }
}

function feedList(req, res, next) {
  db.collection("account").find().toArray(function(err, data) {
    res.render('pages/feed', {
      data: data
    });
    // res.render(data);
    console.log(req.session);
  });
}


// function deleteAccount(req, res, next){
//   let id = req.params.id 
//   db.collection('account').deleteOne({
//     _id:mongo.ObjectID(id)
//   }, done)
// 
//   function done(err){
//     if(err){
//       next(err)
//     }else{
//       res.json({status:'ok'})
//     }
//   }
// }




////////////////////////////////////////////////////

function servermsg() {
  console.log('De server is geactiveerd!');
}

function errNotFound(req, res) {
  res.status(404).render('pages/404');
}