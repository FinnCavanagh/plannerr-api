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

}

function groupsUpdate(req, res){

}

function groupsDestroy(req, res){

}