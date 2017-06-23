exports.index = function(req, res) {
    var user = req.decoded;
    console.log(user);
};

exports.get = function(req, res) {
    var id = req.params.id;
};

exports.create = function(req, res) {

};

exports.delete = function(req, res) {
    var id = req.params.id;
    res.json({message:'Not implemented'});
};