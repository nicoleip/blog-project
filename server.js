// initial set up ==================================================

var express = require ('express');

// creating the app with express  
var app     = express(); 

// for working with data from HTML POST   
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

// simulate DELETE and PUT requests
var methodOverride = require('method-override');

// mongoose is for mongodb
var mongoose = require('mongoose');

// log requests to the console
var morgan   = require('morgan'); 

// use jwt-simple
var jwt = require('jwt-simple');

var passport = require('passport');

var flash = require('connect-flash');

var session = require('express-session');

// load db config file
var db = require('./config/db');

//var passportConfig = require('./app/app_auth_api/config/passport');


// configuration ==================================================

// connect to the mongo database
mongoose.connect(db.url);

// set the static files location
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type : 'application/vnd.api+json'}));


app.use(methodOverride('X-HTTP-Method-Override'));

// log every request to the console
app.use(morgan('dev'));

// read cookies
app.use(cookieParser());


app.use(session({secret : "secretsessionstring"}));

// set the jwt application
app.set('jwtTokenSecret', 'SecretAuthString');

app.set('view engine', 'ejs');

// initialize passport
app.use(passport.initialize());

// persistant login session
app.use(passport.session());

// used for flash messages which are stored in session
app.use(flash());

// configure the routing of the application
 var router = express.Router();

 require('./app/routes')(router);

 app.use('', router);


 //  error-handlers ============================================

//  app.use(function(err, req, res, next) {
//      if(err.name === 'UnauthorizedError'){
//          res.status(401);
//          res.json({"message" : err.name + ": " + err.message});
//      }
//  });

// listen

var port = process.env.PORT || 8080;

app.listen(port);

console.log('App is listening on port ' + port);














// 

// var Nerd = require('./app/models/Nerd');



// 



//exports = module.exports = app; 