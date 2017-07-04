var Course = require('../models/Course');
var log = require('noogger');

exports.courseMembership = function() {
    Course.find({}, function(err, courses) {
        if(err) log.error(err);
        else {
            for(var i=0; i<courses.length; i++) {
                if(courses[i].slackConfig) {
                    Course.updateMembership(courses[i]._id, function(err) {
                        if(err) log.error('Error updating course membership: ' + err);
                    });
                }
            }
            log.info('Updated course membership');
        }
    });
};

exports.clusters = function() {

};