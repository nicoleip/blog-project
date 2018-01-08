// initial set up ==================================================

var express = require ('express');

// creating the app with express  
var app     = express(); 

// for working with data from HTML POST   
var bodyParser = require('body-parser');

// simulate DELETE and PUT requests
var methodOverride = require('method-override');

// mongoose is for mongodb
var mongoose = require('mongoose');

// log requests to the console
var morgan   = require('morgan'); 

// load db config file
var db = require('./config/db');


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


// configure the routing of the application

 var router = express.Router();

 require('./app/routes')(router);

 app.use('/api', router);


// listen

var port = process.env.PORT || 8080;

app.listen(port);

console.log('App is listening on port ' + port);














// 

// var Nerd = require('./app/models/Nerd');



// 



//exports = module.exports = app; 