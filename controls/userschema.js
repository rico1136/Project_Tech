const mongoose = require('mongoose');

console.log('----------- userSchema added ----------------')

mongoose.connect('mongodb://localhost/Project_Tech', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

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

let user = mongoose.model('account', userSchema);
module.exports = user;
