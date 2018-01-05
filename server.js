var express = require ('express');
var app     = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var db = require('./config/db');

var port = process.env.PORT || 8080;



app.use(bodyParser.json());

app.use(bodyParser.json({type : 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect(db.url);

var router = express.Router();

var Nerd = require('./app/models/Nerd');

require('./app/routes')(router);

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);

exports = module.exports = app; 