var User = require('../models/user');
var request = require('request');
var jwt = require('jsonwebtoken');
var secret = process.env.PLANNERR_JWT_SECRET;


function facebook(req, res) {
  if(!req.body.access_token) return res.status(401).json({ message: 'No Access Token' });

  request({url: 'https://graph.facebook.com/oauth/access_token_info?client_id=' + process.env.PLANNERR_FACEBOOK_API_KEY + '&access_token=' + req.body.access_token, json: true }, function(err, fbRes, fbBody) {
    console.log("REQUEST returned");
    if(fbBody.error) return res.status(401).json({message: 'No Access Token'});

    User.findOne({facebook_id: req.body.facebook_id }, function(err, user) {
      console.log("MONGO returned");
      if(err) return res.status(500).json({ message: err });

      if(user) {
        console.log("user found");
        user.access_token = req.body.access_token;
        user.profile_picture = req.body.profile_picture;
        user.save(function(err, user) {
          if(err) return res.status(500).json({ message: err });
          var token = jwt.sign({id: user._id, first_name: user.first_name, last_name: user.last_name}, secret, 24*60*60);
          return res.status(200).json({token: token, user: user});
        });
      } else {
        user = new User({ 
          facebook_id: req.body.facebook_id, 
          access_token: req.body.access_token,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          profile_picture: req.body.profile_picture
        });
        console.log("new user");
        user.save(function(err, user) {
          if(err) return res.status(500).json({ message: err });
          console.log("user saved");
          var token = jwt.sign({id: user._id, first_name: user.first_name, last_name: user.last_name}, secret, 24*60*60);
          return res.status(200).json({token: token, user: user});
        });
      }
    })
  })
};

module.exports = {
  facebook: facebook
}