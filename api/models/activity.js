var mongoose = require("mongoose");


var activitySchema = new mongoose.Schema({
  activity_name: String,
  activity_type: String,
  pitch: String,
  image: String,
  place_id: String,
  votes_count: Number,
  users_voted: [{ user_id : mongoose.Schema.Types.ObjectId , type: Number }],
  url: String,
  user_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Activity", activitySchema);

//store id on model using ajax
//call id to front end to view place info