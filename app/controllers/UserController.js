var User = require('../models/User');
exports.index = function(req, res) {
    User.find({}, function(err, users) {
         if(err) res.status(500).json({ok:false});
         else res.json(users);
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    User.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, user) {
        if(err) res.status(500).json({ok:false});
        else res.json(user);
    });
};

exports.get = function(request, response) {
    var id = req.params.id;
    User.findOne({_id:id}, function(err, user) {
        if(err) res.status(500).json({ok:false});
        else res.json(user);
    });
};