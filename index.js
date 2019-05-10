

const express = require("express"); // https://expressjs.com/
const app = express();
const server = app.listen(3000);
app.use(express.static('public'));
app.get('/', function(req, res){
  res.send('try this out')
})


const camelCase = require("camelcase"); // test package installed
console.log(camelCase('werkt-dit-of-totaal-niet3'));


var iets = camelCase('foo-bar');
console.log(iets);
