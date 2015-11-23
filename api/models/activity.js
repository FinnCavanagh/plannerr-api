var mongoose = require("mongoose");


var activitySchema = new mongoose.Schema({
  activity_name: String,
  activity_type: String,
  pitch: String,
  image: String,
  votes_count: Array,
  votes: [{ user_id : mongoose.Schema.Types.ObjectId , type: Number }],
  // yelp API
  // location: //?
  url: String,
  // rating: //?
  user_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Activity", activitySchema);