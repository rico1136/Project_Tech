const camelCase = require("camelcase"); // test package installed
console.log(camelCase('werkt-dit-of-totaal-niet3'));

const ejs = require("ejs");

const express = require("express");
const app = express();
const port = 3000;

app.get('/', function(request, response) {
   response.send('veranderen')
});

app.listen(port, function() {
  console.log('De server staan aan!')
});
