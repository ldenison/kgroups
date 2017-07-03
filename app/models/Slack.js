var User = require('../models/User');
var env = require('node-env-file');
var request = require('request');
env(__dirname + '/../../server.env');
var SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
var SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;

var users = {
    list : function(token, presence, cb) {
        request({
            url: 'https://slack.com/api/users.list', //URL to hit
            qs: {token:token, presence: presence, client_id: SLACK_CLIENT_ID, client_secret: SLACK_CLIENT_SECRET}, //Query string data
            method: 'GET' //Specify the method

        }, function (error, response, body) {
            if(error) cb(error);
            var json = JSON.parse(body);
            cb(undefined, json.members);
        });
    }
};

var channels = {
    randomName: function() {
        return 'kgroups-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    },
    create: function(token, name, validate, cb) {
        request.post({
            url: 'https://slack.com/api/channels.create',
            form: {
                token: token,
                name: name,
                validate: validate
            }

        }, function(err, response, body) {
            if(err) cb(err);
            else {
                var json = JSON.parse(body);
                cb(undefined, json);
            }
        });
    },
    invite: function(token, channel, user, cb) {
        request.post({
            url: 'https://slack.com/api/channels.invite',
            form: {
                token: token,
                channel: channel,
                user: user
            }
        }, function(err, response, body) {
            if(err) cb(err);
            else {
                var json = JSON.parse(body);
                cb(undefined, json);
            }
        });
    },
    createAndInvite: function(token, name, validate, cluster, cb) {
        request.post({
            url: 'https://slack.com/api/channels.create',
            form: {
                token: token,
                name: name,
                validate: validate
            }

        }, function(err, response, body) {
            if(err) cb(err);
            else {
                var json = JSON.parse(body);
                for(var i=0; i<cluster.length; i++) {
                    var u = cluster[i].owner;
                    User.findOne({_id: u}, function(err, user) {
                        if(err) cb(err);
                        console.log('adding user ' + user.name + ' to channel ' + json.channel.name);
                        request.post({
                            url: 'https://slack.com/api/channels.invite',
                            form: {
                                token: token,
                                channel: json.channel.id,
                                user: user.id
                            }
                        }, function(err, response, body) {
                            if(err) cb(err);
                            else {
                                var json = JSON.parse(body);
                                cb(undefined, json);
                            }
                        });
                    });
                }
            }
        });
    }
};

exports.users = users;
exports.channels = channels;