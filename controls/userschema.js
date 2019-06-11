const mongoose = require('mongoose');
const express = require('express');
const db = require('mongodb');

console.log('----------- userSchema added ----------------')

mongoose.connect('mongodb://localhost/Project_Tech', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

let userSchema = new mongoose.Schema({
  name:{
    type:String
  },
  age:{
    type: Number
  },
  state:{
    type: String
  },
  email:{
    type: String,
    unique: true
  },
  password:{
    type: String
  },
  file:{
    type: String,
  }
}) 

let user = mongoose.model('account', userSchema);
module.exports = user;
