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
    create: function(token, name, validate, cb) {

    }
};

exports.users = users;