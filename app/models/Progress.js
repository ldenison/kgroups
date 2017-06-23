var mongoose = require('mongoose');

var ProgressSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    course: {type: String, require:true},
    tasks: [{taskId: String, status: String}]
});
var Progress = mongoose.model('Progress', ProgressSchema);
module.exports = Progress;