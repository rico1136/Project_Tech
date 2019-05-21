const camelCase = require('camelcase'); // test package installed

const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const getAge = require('get-age');



//Testing data 

let accounts =[
  {
    id:1,
    name:'joan',
    age: '26',
    state:'woman',
    email:'joanpadolina@gmail.com',
    password:'1234'

  },
  {
    id:2,
    name:'jan',
    age: '27',
    state:'man',
    email:'janno@hotmail.com',
    password:'4321'
  }
];
// multer



// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//////////// APP - USE GET 



//index.ejs package

app.get('/', function(req, res) {
  res.render('pages/index');
});

// --------- Pages ------------//

app.get('/profile', function(req, res) {
  res.render('pages/profile');
});

app.get('/list', function(req, res) {
  res.render('pages/list');
});


app.get('/register', function(req, res) {
  res.render('pages/register')
});
app.post('/register', function(req, res, next){
  
  accounts.push({
    id: 3,
    name: req.body.name,
    age: req.body.age,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password

  });
  console.log(accounts);
  res.redirect('/');
});

app.get('/', function(req, res){
  res.render('/pages/index')
});


// --------------  POST -------------// 



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
