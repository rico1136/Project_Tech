const express = require('express')
const router = express.Router()

/*  When the user hits /logout, the current session will be destroyed and all pages will be locked. At last, the function will redirect
to the login page.  */

router.get('/logout', (req, res) => {
  req.session.destroy()
  console.log('Succesfully logged out')
  res.redirect('/login')
  res.status(200).send()
})

module.exports = router
