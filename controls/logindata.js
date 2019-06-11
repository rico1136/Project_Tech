const express = require('express');
const app = express();
const router = express.Router();
const mongo = require('mongodb'); //https://www.mongodb.com/



router.post('/login', function (req, res, next) { // hulp van bas
  const password = req.body.password;
  const email = req.body.email;
  db.collection('account').findOne({
    email: req.body.email,
    password: req.body.password
  }, done);

  function done (err, data) {
    if (!data) {
      res.status(404).send('Email of wachtwoordt wordt niet herkend')
    } else {
      if(email === data.email){
        req.session.user = {name: data._id}
        res.redirect('feed')
      }else{
        res.status(401).send('Account wordt niet herkend')
      }
      req.session.save
    }
  }
  console.log(password)
  // req.session.user = accounts[0].name;
  // if(req.session.user) {
  //   res.render('pages/login');
  // } else {
  //   res.redirect(401).send('Geen session!')
  // }
  // console.log(req.session);
}
)

module.exports=router;
