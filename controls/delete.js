const express = require('express')
const router = express.Router()
const User = require('./user-schema')

/*  This function will run when the user enters the /delete url. The ID of the user will be retreived through the session object.
The function will find the object with the same id and remove it from the db. Then, it will redirect to logout  */

router.get('/delete', (req, res) => {
  const id = req.session.user._id
  User.findOneAndRemove({ _id: id }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      console.log('User removed')
      res.status(200).send()
      res.redirect('/logout')
    }
  })
})

module.exports = router
