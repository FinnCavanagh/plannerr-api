var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var activitiesController = require('../controllers/activities_controller');
var groupsController = require('../controllers/groups_controller');
var usersController = require('../controllers/users_controller');
var authenticationsController = require('../controllers/authentications_controller');

//routes for authenticating login and register with tokens

// router.post('/login', authenticationsController.login);
// router.post('/register', authenticationsController.register);

//routes required for application
router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

module.exports = router