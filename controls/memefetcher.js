const fetch = require('node-fetch');
const routes = require('express').Router()
let memesrc;
const randommeme = () => {
  fetch('https://meme-api.herokuapp.com/gimme')
  .then(res => res.json())
  .then(json => {
            memesrc = json.url; 
            console.log(memesrc);
            });
        };
randommeme();
