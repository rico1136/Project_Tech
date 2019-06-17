const express = require('express'); //https://expressjs.com/
const app = express();
const port = process.env.PORT ||  3000;
const dotenv = require('dotenv'); //https://www.npmjs.com/package/dotenv
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const arrayFind = require('array-find'); //https://www.npmjs.com/package/array-find
const mongo = require('mongodb'); //https://www.mongodb.com/
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
const session = require('express-session'); //https://www.npmjs.com/package/express-session
const fetch = require('node-fetch');


require('dotenv').config(); // gegeven voor de mongodb server


// ---- CMD-BT Slides MongoDB ---//

var db = null;


mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+"Memedatingapp?retryWrites=true&w=majority",{ useNewUrlParser: true })
var db = mongoose.connection; // here i make a connection with mongodb my host, username and pw are in the .env file

db.once('open', function() {
  console.log("connected mongodb")
}); // check if we are connected to mongodb

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// express engine //
app.set('view engine', 'ejs');
// session //
app.set('trust proxy', 1) // vetrouw de eerste server
app.use(session({
  secret: 'supergeheimedingen',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

// controls gebruiken
const loginTest = require('./controls/logindata.js');
const addRegis = require('./controls/register.js');
const profile = require('./controls/profile.js');
const matches = require('./controls/matches.js');
const deleteUser = require('./controls/deleteUser.js');
const logOut = require('./controls/logOut.js');
const updateUser = require('./controls/update.js');
const memeCategory = require('./controls/memeCategory.js');
const User = require('./controls/userschema');
const deleteMeme = require('./controls/deleteMeme');
// Standard routes
app.get('/profile', redirectProfile);
app.get('/matchprofile', redirectFeed);
app.get('/list', listPage);
app.get('/feed', feedList);
app.get('/register', register);
app.get('/login', login);
app.get('/matchprofile/:id', getmatch);
app.get('/memetest', (req, res) => {
  randommeme()
  res.render('pages/memetest', { memesrc: memesrc })
})
app.get('/update', function(req, res){
  res.render('pages/update', {user: req.session.user});
})

// routing van de pagina's //
app.get('/', index);
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(loginTest);
app.use(addRegis);
app.use(profile);
app.use(matches);
app.use(deleteUser);
app.use(logOut);
app.use(updateUser);
app.use(memeCategory)


app.post('/profile/:id', addRegis);
app.post('/meme', saveMeme);
app.post('/delete', deleteMeme);
// leest de form en slaat het op in een js code
app.use(errNotFound);
app.listen(port, servermsg);

//--- pagina render---//

function redirectProfile(req,res){
  res.redirect(`/profile/${req.session.user._id}`);
}

function index(req, res) {
  res.render('pages/index');
}

function register(req, res, next) {
  res.render('pages/register');
}

function login(req, res) {
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


function redirectFeed(req, res, next){
  if(!req.session.user){
    res.redirect('/login')
  }else(res.render('/feed'));
}

function getmatch(req, res, next) {
  let id = req.params.id
  db.collection('account').findOne({
    _id: new mongo.ObjectID(id)
  }, done)


  function done(err, data) {
    if (err) {
      next(err)
    } if(!req.session.user){
      
      res.redirect('/login');
    }else {
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



let memesrc = 'https://i.redd.it/jtxgfmm95h331.jpg'; //placeholder
const randommeme = () => {
  fetch('https://meme-api.herokuapp.com/gimme')
  .then(res => res.json())
  .then(json => {
        memesrc = json.url; 
        return memesrc;
    });
};

function saveMeme(req, res) {
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
} 

////////////////////////////////////////////////////

function servermsg() {
  console.log('De server is geactiveerd!');
}

function errNotFound(req, res) {
  res.status(404).render('pages/404');
}