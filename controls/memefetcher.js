const fetch = require('node-fetch');
const routes = require('express').Router()

const randommeme = () => {
  fetch('https://meme-api.herokuapp.com/gimme')
  .then(res => res.json())
  .then(json => {
            const memesrc = json.url; 
            console.log(memesrc);
            
            });
        };
randommeme();