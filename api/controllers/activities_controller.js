var Activity = require('../models/activity');

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