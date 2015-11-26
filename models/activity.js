var mongoose = require("mongoose");


var activitySchema = new mongoose.Schema({
  activity_name: String,
  activity_type: String,
  pitch: String,
  image: String,
  place_id: String,
  users_voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  url: String,
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});


activitySchema.pre("save", function(next){
  //check that each user only appears once in the users voted array
  var activity = this;

  if(activity.isModified('users_voted')) {
    //one instance of each id in the array
    var uniqueArray = [];
    activity.users_voted.forEach(function(voter){
      if(uniqueArray.indexOf(voter) === -1) {
        uniqueArray.push(voter);
      }
    });

    activity.users_voted = uniqueArray;
  }

  next();
});

//in layout: activity.users_voted.length

module.exports = mongoose.model("Activity", activitySchema);


//store id on model using ajax
//call id to front end to view place info