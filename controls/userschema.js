const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: String,
  memeCategory: String
})

let User = mongoose.model('account', userSchema);
module.exports = User;
