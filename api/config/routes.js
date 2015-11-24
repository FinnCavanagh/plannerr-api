var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var activitiesController = require('../controllers/activities_controller');
var groupsController = require('../controllers/groups_controller');
var usersController = require('../controllers/users_controller');
var authenticationsController = require('../controllers/authentications_controller');

//routes for authenticating login and register with tokens

// set up the facebook auth route
router.route('/auth/facebook')
  .post(authenticationsController.facebook);

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

router.route('/groups')
  .get(groupsController.groupsIndex)
  .post(groupsController.groupsCreate);

router.route('/groups/:id')
  .get(groupsController.groupsShow)
  .put(groupsController.groupsUpdate)
  .patch(groupsController.groupsUpdate)
  .delete(groupsController.groupsDelete)

  router.route('/activities')
    .get(activitiesController.activitiesIndex)
    .post(activitiesController.activitiesCreate)

  router.route('/activities/:id')
    .get(activitiesController.activitiesShow)
    .put(activitiesController.activitiesUpdate)
    .patch(activitiesController.activitiesUpdate)
    .delete(activitiesController.activitiesDelete)

module.exports = router