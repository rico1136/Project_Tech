const fetch = require('node-fetch');


let memesrc = 'https://i.redd.it/jtxgfmm95h331.jpg'; //placeholder
const randommeme = () => {
  fetch('https://meme-api.herokuapp.com/gimme')
  .then(res => res.json())
  .then(json => {
        memesrc = json.url; 
        return memesrc;
    });
};

module.exports = randommeme