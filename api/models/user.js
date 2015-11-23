var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  facebook_id: String,
  access_token: String,
  first_name: String,
  last_name: String,
  email: String
  profile_image: String,
  header_image: String,
  groups: [{type: mongoose.Schema.ObjectId, ref: 'Group'}],
});

module.exports = mongoose.model("User", userSchema);