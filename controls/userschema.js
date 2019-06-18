const mongoose = require('mongoose');
require('mongoose-type-email');

let userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: String,
  memeCategory: String,
  memes: [],
  likes: [],
});

let User = mongoose.model('account', userSchema);
module.exports = User;
