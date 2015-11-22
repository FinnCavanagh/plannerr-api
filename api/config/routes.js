var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var activitiesController = require('../controllers/activities_controller');
var groupsController = require('../controllers/groups_controller');
var usersController = require('../controllers/users_controller');
var authenticationsController = require('../controllers/authentications_controller');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

//routes required for application