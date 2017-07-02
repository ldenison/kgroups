var Cluster = require('../helpers/Cluster');
exports.getByCourse = function(req, res) {
    Cluster.cluster(req.params.courseId, function(err, clusters) {
        res.json(clusters);
    });
};