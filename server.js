const camelCase = require('camelcase'); // test package installed

const express = require('express');
const app = express();
const port = 3000;

//Testing

let testing = {
  1: 'joan',
  2: 'Jannos',
  3: 'Eoois'
}

app.get('/index/:id', function(req, res) {
  res.render('testing', { name : [req.params.id]});
})

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

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


// --------- 404 ERROR ------------//

app.use(function(req, res) {
  res.status(404).render('pages/404');

});




//// Testing dynamic data




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