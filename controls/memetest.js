const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.post('/memecategory',function (req, res) { // when / gets post method
    console.log('new memetest data');
    console.log(req.body);
    var memeCategory = req.body.outcomeInput; // gets input from form bucketlist
    console.log(memeCategory + 'het werkt'); // log in to the console
    //  Profile.updateOne({}, { profileType: type });
    User.updateOne({ _id: req.session.user._id, },{ memeCategory : memeCategory }, function(err) {
   
       // update the type of the user
      if(err) { throw err; }
      else{
          res.redirect(`/profile/${req.session.user._id}`);
      }
   });
   });

   module.exports = router;