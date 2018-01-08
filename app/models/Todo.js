var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: String,
    default: ''
});

module.exports = mongoose.model('Todo', TodoSchema);