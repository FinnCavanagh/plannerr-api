var mongoose = require("mongoose");


var activitySchema = new mongoose.Schema({
  activity_name: String,
  activity_type: String,
  pitch: String,
  image: String,
  votes_count: Array,
  place_id: String,
  url: String,
  user_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Activity", activitySchema);

//store id on model using ajax
//call id to front end to view place info