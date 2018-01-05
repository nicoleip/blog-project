var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NerdSchema = new Schema({
    name: String,
    default: ''
});

module.exports = mongoose.model('Nerd', NerdSchema);