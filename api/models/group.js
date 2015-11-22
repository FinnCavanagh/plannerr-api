var mongoose = require("mongoose");
var activitiy   = require('./activity');

module.exports = mongoose.model('Group',{
  
  name: String,
  activity_duration: String,
  decision_expiry_time: Date,
  image: String,
  admin_users: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  activities: [activity.Schema],
  users: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model("Group", userSchema);