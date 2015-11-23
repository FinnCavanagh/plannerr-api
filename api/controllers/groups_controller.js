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
    image: req.body.image
  });
  group.save(function(err){
    if(err) return res.render('error', {message: 'Could not create group ' + (err) });
    res.status(201).json({ group: group });
  });


}

function groupsUpdate(req, res){

}

function groupsDestroy(req, res){

}