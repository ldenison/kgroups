var Course = require('../models/Course');
var Progress = require('../models/Progress');

exports.index = function(req, res) {
    var user = req.decoded;
};

exports.get = function(req, res) {
    var courseId = req.params.id;
    var id = req.decoded._doc._id;
    var c, p;
    Course.findOne({_id:courseId}, function(err, course) {
        if(err) {
            res.status(500).json({ok:false});
        }
        else {
            c = course;
            Progress.find({course:courseId, owner:id}, function(err, progress) {
                if(err) res.status(500).json({ok:false});
                else {
                    p = progress;
                    res.json({course:c, progress:p});
                }
            });
        }
    });
};

exports.getByCourseId = function(req, res) {
    var courseId = req.params.courseId;
    var owner = req.decoded._doc._id;
    Progress.findOne({course:courseId, owner:owner}, function(err, progress) {
        if(err) res.status(500).json({ok:false});
        else {
            res.json(progress);
        }
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    Progress.findOne({_id:id}, function(err, progress) {
        if(err) res.status(500).json({ok:false});
        if(progress) {
            progress.tasks = req.body.tasks;
            progress.save(function(err, progress) {
                if(err) res.status(500).json({ok:false});
                res.json(progress);
            });
        }
    });
};

exports.create = function(req, res) {
    var p = new Progress(req.body);
    p.owner = req.decoded._doc._id;
    p.save(function(err, progress) {
        if(err) res.status(500).json({ok:false});
        else res.json(progress);
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;
    res.json({message:'Not implemented'});
};