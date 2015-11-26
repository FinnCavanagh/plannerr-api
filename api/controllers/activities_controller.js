var Activity = require('../models/activity');

function activitiesIndex(req, res){
  Activity.find(function(err, activities){
    if (err) return res.status(404).json({message: 'Something went wrong and we could not pull the activities.'});
    res.status(200).json({ activities: activities });
  });
};

function activitiesShow(req, res){
  Activity.findById(req.params.id, function(err, activity){
    if (err) return res.status(404).json({message: 'Something went wrong and we could not find the activity.'});
    res.status(200).json({ activity: activity });
  });
};

function activitiesCreate(req, res){
  var activity = new Activity({
    activity_name: req.body.activity_name,
    activity_type: req.body.activity_type,
    pitch: req.body.pitch,
    image: req.body.image,
    place_id: req.body.place_id,
    url: req.body.url,
    user: req.user.id
    //We will set the user id using ajax
  });
  activity.save(function(err){
    if(err) return res.render('error', {message: 'Could not create activity ' + (err) });
    res.status(201).json({ activity: activity });
  });
}

function activitiesUpdate(req, res){
  Activity.findById(req.params.id,  function(err, activity) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!activity) return res.status(404).json({message: 'No activity found.'});

    activity.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Activity successfully updated.', activity: activity});
    });
  });
}

function activitiesDelete(req, res){
  Activity.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Activity has been successfully deleted'});
  });
}

module.exports = {
  activitiesIndex:  activitiesIndex,
  activitiesShow:   activitiesShow,
  activitiesCreate: activitiesCreate,
  activitiesUpdate: activitiesUpdate,
  activitiesDelete: activitiesDelete
}
// Post.findOne({_id:<post-id>)}, function(err, post){
//      post.vote = post.votes.filter(function(vote){
//          return vote.user_id === req.body.userID;
//      })[0].type;
//      res.send(post)
//   }
// )

// // or list of posts

// Post.find(function(err, posts){
//      posts.forEach(function(post){
//          post.vote = post.votes.filter(function(vote){
//              return vote.user_id === req.body.userID;
//          })[0].type;
//      });
//      res.send(posts)
//   }
// )
// // you can move vote finding logic in a function: 
// function findVote(post) {
//     var vote = post.votes.filter(function(vote){
//         return vote.user_id === req.body.userID;
//     })[0]
//     if(vote) return vote.type;
// }

// to find the latest votes of a particular user:

// Post.find({'votes.user_id': req.body.userID}, function(err, posts){
//      posts.forEach(function(post){
//          // using findVote defined above
//          post.vote = findVote(post);
//      });
//      res.send(posts)
//   }
// )