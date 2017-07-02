var Course = require('../models/Course');

exports.index = function(req, res) {
    Course.find({}, function(err, courses) {
        if(err) {
            res.status(500).json({ok:false});
        }
        else res.json(courses);
    });
};

exports.enrolled = function(req, res) {
    var id = req.decoded._doc.id;
    Course.find({'members.id': id}, function(err, courses) {
        if(err) {
            res.status(500).json({ok:false});
        }
        else res.json(courses);
    });
};

exports.get = function(req, res) {
    var id = req.params.id;
    Course.findOne({_id:id}, function(err, course) {
        if(err) {
            res.status(404).json({ok:false});
        }
        else res.json(course);
    });
};

exports.create = function(req, res) {
    var data = req.body;
    data.owner = req.decoded._id;

    var course = new Course(data);
    course.save(function(err, course) {
        if(err) {
            res.json({ok:false});
        }
        else {
            res.json(course);
        }
    });
};

exports.update = function(req, res) {
    Course.findOne({_id:req.params.id}, function(err, rec) {
        var  course = (rec)? Object.assign(rec, req.body) : new Course(req.body);
        course.save(function(err, course) {
            if(err) res.status(500).json({ok:false});
            else {
                res.json(course);
            }
        });
    });
};

exports.delete = function(req, res) {

};