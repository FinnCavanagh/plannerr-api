var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

module.exports = mongoose.model('User',{
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  image: String,
  header_image: String,
});