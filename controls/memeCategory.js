const express = require('express');
const router = express.Router();
const User = require('../controls/userschema');
const session = require('express-session'); //https://www.npmjs.com/package/express-session

router.post('/memecategory',(req, res) => { // when / gets post method
    console.log('new memetest data');
    var memeCategory = ""
    // console.log(memeCategory); // log in to the console
    //  Profile.updateOne({}, { profileType: type });
    User.updateOne({ _id: req.session.user._id, },{memeCategory: calculateMemeCategory(req)},{ memeCategory : memeCategory }, (err) => {
        
        // update the type of the user
        if(err) { throw err; }
        else{
            res.redirect(`/profile/${req.session.user._id}`);
        }
    });
});

function calculateMemeCategory(req){
    // event.preventDefault();
  // console.log("test submit")
  var q1 = req.body.q1
  var q2 = req.body.q2
  var q3 = req.body.q3
  var q4 = req.body.q4
//   var outcomeInput = req.body.outcomeInput
  var outcome = Number(q1) + Number(q2) + Number(q3) + Number(q4);
  console.log(q1+ " "+ q2 + " "+ q3 + " "+ q4);
  console.log(outcome);
  var category = "";
  if(outcome < 20){
    category = "Childish";
  }
  else if(outcome > 19 && outcome < 30){
    category = "Akward"
  }
  else {
    category = "Dark Humor"
  }
  console.log(category)
  return category
  };


router.get('/memecategory', (req, res) => {
    if (!req.session.user){
        res.redirect('/login');
        return
    }
    User.find({ _id: {$ne: req.session.user._id},
    }, (err, profiles) => {
        res.render('pages/memecategory', {profiles : profiles, currentUser : req.session.user})
    });
});



module.exports = router;