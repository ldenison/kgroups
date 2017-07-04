var User = require('../models/User');
exports.index = function(req, res) {
    User.find({}, function(err, users) {
         if(err) res.status(500).json({ok:false});
         else res.json(users);
    });
};

exports.get = function(request, response) {

};

exports.create = function(request, response) {

};

exports.delete = function(request, response) {

};