var User = require('../models/User');
var Slack = require('../models/Slack');
var Course = require('../models/Course');
var Cluster = require('../helpers/Cluster');

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

exports.createCourseChannels = function(req, res) {
    var courseId = req.params.courseId;

    Course.findOne({_id:courseId}, function(err, course) {
        if(err) res.status(500).json({ok:false});
        if(!course.slackConfig) res.status(500).json({ok:false});
        else {
            Cluster.cluster(courseId, function(err, clusters) {
                if(err) res.status(500).json({ok:false});
                else {
                    for(var i=0; i<clusters.length; i++) {
                        var c = clusters[i];
                        console.log('cluster: '+ c);
                        Slack.channels.createAndInvite(course.slackConfig.access_token, Slack.channels.randomName(), true, c, function(err, channel) {
                            if(err) res.status(500).json({ok:false});
                        });
                    }
                    res.json({ok:true});
                }
            });
        }
    });
};