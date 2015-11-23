var mongoose = require("mongoose");
var activity   = require('./activity');

var groupSchema = new mongoose.Schema({
  name: String,
  activity_duration: String,
  decision_expiry_time: Date,
  image: String,
  admin_users: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  activities: [activity.schema],
  users: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Group", groupSchema);