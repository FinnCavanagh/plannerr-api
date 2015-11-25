var express        = require('express');
//!!We will maybe need cors I'm not sure
var cors           = require('cors');
//!!
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var MongooseVoting = require('mongoose-voting');
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var Group          = require('./models/group');
var Activity       = require('./models/activity');

var secret = process.env.PLANNERR_JWT_SECRET;

//This will connect to the db when we figure out the location
mongoose.connect('mongodb://localhost:27017/plannerr-app');


//This will require the passport file
// require('./config/passport')(passport);

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(cors());

//do we need this to have secrets?
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [{ url: '/api/auth/facebook', methods: ['POST'] }]
  }));
//this will require the routes when they exist, enabling this will result in a callback error
var routes = require('./config/routes');
app.use("/api", routes);

app.listen(3000);
console.log("listening");

app.get('/', function(req, res){
  res.send('looks like I can talk to the client');
});