const User = require('./userschema');
const express  = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
  })); 
app.post('/delete', deleteMeme)
function deleteMeme(req, res, i) {
    const id = req.session.user._id;
    console.log(i);
    User.findOne({ _id: id }, (err, foundObject) => {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        if (!foundObject) {
          console.log('User not found in database')
          res.status(404).send()
        } else {
        //   foundObject.memes.push(memesrc)
        //   foundObject.save((err, updatedObject) => {
        //     if (err) {
        //       console.log(err)
        //       res.status(500).send()
        //     } else {
        //       console.log('user saved' + updatedObject)
        //       res.status(200).send()
        //       res.redirect('memetest')
        //     }
        //   })
        }
      }
    })
  } 