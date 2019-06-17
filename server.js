const express = require('express'); //https://expressjs.com/
const app = express();
const port = process.env.PORT ||  3000;
const dotenv = require('dotenv'); //https://www.npmjs.com/package/dotenv
const bodyParser = require('body-parser'); //https://www.npmjs.com/package/body-parser
const mongoose = require('mongoose'); //https://www.npmjs.com/package/mongoose
const session = require('express-session'); //https://www.npmjs.com/package/express-session

// Setup static folders
app.use(express.static('public'));
app.use(express.static('upload'));

// setup session
app.use(session({
  secret: 'supergeheimedingen',
  resave: false,
  saveUninitialized: true,
}));

// setup bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Setup express
app.set('view engine', 'ejs');
app.set('trust proxy', 1); // vetrouw de eerste server

require('dotenv').config(); // gegeven voor de mongodb server

// ---- Connection to the database ---//
let db = null;
mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+"Memedatingapp?retryWrites=true&w=majority",{ useNewUrlParser: true })
db = mongoose.connection; // here i make a connection with mongodb my host, username and pw are in the .env file
db.once('open', () => {
  console.log("connected mongodb")
}); // check if we are connected to mongodb
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// controls gebruiken
const loginTest = require('./controls/logindata.js');
const addRegis = require('./controls/register.js');
const profile = require('./controls/profile.js');
const matches = require('./controls/matches.js');
const deleteUser = require('./controls/deleteUser.js');
const logOut = require('./controls/logOut.js');
const updateUser = require('./controls/update.js');
const memeCategory = require('./controls/memeCategory.js');
const deleteMeme = require('./controls/deleteMeme.js');
const memeFetcher = require('./controls/memeFetcher.js');

// routing van de pagina's //
app.use(loginTest);
app.use(addRegis);
app.use(profile);
app.use(matches);
app.use(deleteUser);
app.use(logOut);
app.use(updateUser);
app.use(memeCategory);
app.use(deleteMeme);
app.use(memeFetcher);
// --> Show index
app.get('/', (req, res) => {
  res.render('pages/index.ejs')
});

// errors
app.use((req,res)=> {res.status(404).render('pages/404');});

// Server is activated
app.listen(3000, () => console.log('De server is geactiveerd!'));