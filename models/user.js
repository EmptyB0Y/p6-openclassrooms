const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const users = [
    {
        "email" : "",
        "password" : ""
    },
    {
        "email" : "",
        "password" : ""
    },
    {
        "email" : "",
        "password" : ""
    }
];

const userSchema = mongoose.Schema({ 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  userSchema.plugin(uniqueValidator);
  
  module.exports = mongoose.model('user', userSchema);