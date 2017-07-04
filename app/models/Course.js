var mongoose = require('mongoose');
var Slack = require('./Slack');

var CourseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    courseNumber: {type: String, require:true},
    lastMemberSync: {type: Date},
    tasks: [{order: Number, body: String, due: Date}],
    members: [
        {
            "id": String,
            "team_id": String,
            "name": String,
            "deleted": Boolean,
            "color": String,
            "real_name": String,
            "tz": String,
            "tz_label": String,
            "tz_offset": Number,
            "profile": {
                "avatar_hash":String,
                "current_status": String,
                "first_name": String,
                "last_name": String,
                "real_name": String,
                "email": String,
                "skype": String,
                "phone": String,
                "image_24": String,
                "image_32": String,
                "image_48": String,
                "image_72": String,
                "image_192": String
            },
            "is_admin": Boolean,
            "is_owner": Boolean,
            "updated": Number,
            "has_2fa": Boolean
        }
    ],
    slackConfig: {
        select: false,
        access_token: {type: String},
        scope: {type: String},
        team_name: {type: String},
        team_id: {type: String},
        incoming_webhook: {
            url: {type: String},
            channel: {type: String},
            configuration_url: {type: String}
        },
        bot: {
            bot_user_id: {type: String},
            bot_access_token: {type: String}
        }
    }
});
var Course = mongoose.model('Course', CourseSchema);

Course.updateMembership = function(id, cb) {
    Course.findOne({_id:id}, function(err, course) {
        if(err) cb(err);
        else {
            Slack.users.list(course.slackConfig.access_token, false, function(err, members) {
                if(err) cb(err);
                else {
                    course.members = members;
                    course.lastMemberSync = new Date();
                    course.save(function(err, course) {
                        if(err) cb(err);
                        else {
                            cb(undefined, course);
                        }
                    });
                }
            });
        }
    });
};

module.exports = Course;