var Slack = require('../models/Slack');
var Course = require('../models/Course');

exports.syncMembership = function(req, res) {
    var courseId = req.params.courseId;

    Course.findOne({_id:courseId}, function(err, course) {
        if(err) res.status(500).json({ok:false});
        if(!course.slackConfig) res.status(500).json({ok:false});
        else {
            Slack.users.list(course.slackConfig.access_token, true, function(err, users) {
                if(err) res.status(500).json({ok:false});
                else {
                    course.members = users;
                    course.save(function(err, course) {
                        if(err) res.status(500).json({ok:false});
                        course = course.toObject();
                        course.slackConfig = true;
                        res.json(course);
                    });
                }
            });
        }
    });
};