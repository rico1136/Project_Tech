const camelCase = require('camelcase'); // test package installed

const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const slug = require('slug');
const bodyParser = require('body-parser');
const multer = require('multer');
const getAge = require('get-age');

const upload = multer({
  dest: 'public/upload/'
});
// 
// app.set('view engine', 'ejs');
// app.set('views', 'view');
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended: true}));
// 
// app.get('/', index);
// app.get('/account', account);
// app.get('/list', listItem);
// app.get('/register', register);
// 
// app.use(errorSend);
// 
// function index(req, res){
//     res.render('/pages/index', {title: 'Home' });
// }
// function account(req, res){
//     res.render('/pages/account', {title: 'Account' });
// }
// function listItem(req, res){
//     res.render('/pages/list', {title: 'Categorie' });
// }
// function register(req, res){
//     res.render('/pages/register', {title: 'Registreren' });
// }


// //Testing data 
let accounts = [{
    id: 1,
    name: 'joan',
    age: '26',
    state: 'woman',
    email: 'joanpadolina@gmail.com',
    password: '1234'

  },
  {
    id: 2,
    name: 'jan',
    age: '27',
    state: 'man',
    email: 'janno@hotmail.com',
    password: '4321'
  }
];
// multer



// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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

// --------------  POST -------------// 

app.post('/register', function(req, res, next) {
  let id = slug(req.body.name).toLowerCase();
  accounts.push({


    id: id,
    name: req.body.name,
    age: req.body.age,
    state: req.body.state,
    email: req.body.email,
    password: req.body.password

  });
  console.log(req.body);
  res.redirect('/' + id);
});

app.get('/', function(req, res) {
  res.render('/pages/index')
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