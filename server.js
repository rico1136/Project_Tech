const camelCase = require('camelcase'); // test package installed
console.log(camelCase('werkt-dit-of-totaal-niet3'));

const express = require('express');
const app = express();
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

//index.ejs package

app.get('/', function (req, res){
  res.render('pages/index');
});

//profile page

app.get('/profile', function(req, res){
  res.render('pages/profile');
});


app.get('/', function(request, response) {
   response.send('red')
});

app.listen(port, function() {
  console.log('De server staan aan!')
});
