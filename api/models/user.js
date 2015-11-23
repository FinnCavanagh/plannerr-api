var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  image: String,
  header_image: String,
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}],
});

module.exports = mongoose.model("User", userSchema);