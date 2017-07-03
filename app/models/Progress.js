var mongoose = require('mongoose');

var ProgressSchema = new mongoose.Schema({
    slack_id: {type: String},
    owner: {type: String, required: true},
    course: {type: String, require:true},
    tasks: [{taskId: String, status: String}]
});
var Progress = mongoose.model('Progress', ProgressSchema);
module.exports = Progress;