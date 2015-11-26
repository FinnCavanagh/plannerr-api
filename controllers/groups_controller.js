var Group = require('../models/group');

function groupsIndex(req, res){
  Group.find(function(err, groups){
    if (err) return res.status(404).json({message: 'Something went wrong and we could not pull the groups.'});
    res.status(200).json({ groups: groups });
  });
};

function groupsShow(req, res){
  Group.findById(req.params.id, function(err, group){
    if (err) return res.status(404).json({message: 'Something went wrong and we could not find the group.'});
    res.status(200).json({ group: group });
  });
};

function groupsCreate(req, res){
  var group = new Group({
    name: req.body.name,
    activity_duration: req.body.activity_duration,
    decision_expiry_time: req.body.decision_expiry_time,
    image: req.body.image,
    admin_user: req.user.id,
    users: [req.user.id]
  });
  group.save(function(err){
    if(err) return res.render('error', {message: 'Could not create group ' + (err) });
    res.status(201).json({ group: group });
  });
};


function groupsUpdate(req, res){
  Group.findById(req.params.id,  function(err, group) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!group) return res.status(404).json({message: 'No group found.'});

    console.log("REQ USERS",req.body.users);

    if (req.body.name) group.name = req.body.name;
    if (req.body.activity_duration) group.activity_duration = req.body.activity_duration;
    if (req.body.users) group.users = req.body.users;
    if (req.body.admin_user) group.admin_user = req.body.admin_user;

    group.save(function(err, group) {
      console.log(err);
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Group successfully updated.', group: group});
    });
  });
}

function groupsDelete(req, res){
  Group.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Group has been successfully deleted'});
  });
}

module.exports = {
  groupsIndex:  groupsIndex,
  groupsShow:   groupsShow,
  groupsCreate: groupsCreate,
  groupsUpdate: groupsUpdate,
  groupsDelete: groupsDelete
}