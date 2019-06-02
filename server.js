const camelCase = require('camelcase');     // test package installed
const express = require('express');        //https://expressjs.com/
const app = express();
const port = 3000;
const dotenv = require('dotenv');          //https://www.npmjs.com/package/dotenv
const slug = require('slug');              //https://www.npmjs.com/package/slug
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const multer = require('multer');          //https://www.npmjs.com/package/multer
const arrayFind = require('array-find');   //https://www.npmjs.com/package/array-find
const mongo = require('mongodb');          //https://www.mongodb.com/
const mongoose = require('mongoose');      //https://www.npmjs.com/package/mongoose
const session = require('express-session'); //https://www.npmjs.com/package/express-session
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
const upload = multer({dest:'public/upload'});

// ---- CMD-BT Slides MongoDB ---//

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

// express engine //
app.set('view engine', 'ejs');

// routing van de pagina's //

app.get('/', index);
app.get('/login', login);
app.get('/profile' + '/:id', findProfile);
app.get('/profile', ownProfile);
app.get('/list', listPage);
app.get('/feed', feedList)

app.get('/register', register);

app.post('/register', upload.single('file'), addRegis);
app.post('/:id', addRegis);

app.use(express.static('public'));
// leest de form en slaat het op in een js code
app.use(bodyParser.urlencoded({extended: true}));
app.use(errNotFound);



app.listen(port, servermsg);



//--- pagina render---//

function index(req, res){
  res.render('pages/index');
}

function register(req, res, next){  
  res.render('pages/register');
}

function login(req, res){
  res.render('pages/login');
}

function ownProfile(req, res){
  res.render('pages/profile');
}

function listPage(req, res){
  res.render('pages/list');
}
function matchFeed(req, res){
  res.render('pages/feed');
}

function dbCollect(req, res, next){ // require, response, alles tussen de req en res (middleware)
  db.collecction('account');
}


// mongodb 

function findProfile (req, res, next){
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)
  
  
  function done(err, data){
    if(err){
      next(err)
    }else{
      res.render('pages/profile.ejs', {data:data})
    }
  }
}

function feedList(req, res, next){
  db.collection("account").find().toArray(function(err, data) {
      res.render('pages/feed', {data:data});
      // res.render(data);
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


function addRegis(req,res, next){
//slugify url friendly
let id = slug(req.body.name).toLowerCase()
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
    res.redirect('/profile/' + data.insertedId)

  }
}
}


////////////////////////////////////////////////////

function servermsg(){
  console.log('De server is geactiveerd!');
}

function errNotFound(req, res){
  res.status(404).render('pages/404');
}
