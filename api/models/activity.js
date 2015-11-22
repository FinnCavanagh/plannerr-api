var mongoose = require("mongoose");


module.exports = mongoose.model('Activity',{
  
  activity_name: String,
  activity_type: String,
  pitch: Date,
  image: String,
  // yelp API
  location: //?
  url: String,
  rating: //?
  user_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Activity", activitySchema);