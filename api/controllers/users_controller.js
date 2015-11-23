var User = require('../models/user');

function testIndex(req, res){
  res.redirect('/');
};

module.exports= {
  testIndex: testIndex
}