var mongoose = require("mongoose");
var Activity   = require('./activity');

var groupSchema = new mongoose.Schema({
  name: String,
  activity_duration: String,
  decision_expiry_time: Date,
  image: String,
  admin_user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  activities: [Activity.schema],
  users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

groupSchema.pre('save', function(next) {
  var group = this;

  // if admin_user is changed, check new admin user is in users array
  if(group.isModified('admin_user') && group.users.indexOf(group.admin_user) === -1) {
    return next(new Error('Admin User not present in users'));
  }
  // if users is changes, check admin has not been removed
  console.log(group.users, group.admin_user);
  if(group.isModified('users') && group.users.indexOf(group.admin_user) === -1) {
    return next(new Error('Admin User has been removed from users'));
  }

  next();
});

module.exports = mongoose.model("Group", groupSchema);