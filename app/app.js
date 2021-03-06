var env = require('node-env-file');
var path = require('path');
var request = require('request');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var slack = require('./models/Slack');

var courseCtrl = require('./controllers/CourseController');
var progressCtrl = require('./controllers/ProgressController');
var clusterCtrl = require('./controllers/ClusterController');
var slackCtrl = require('./controllers/SlackController');
var userCtrl = require('./controllers/UserController');

var sync = require('./helpers/Synchronizer');

var Slack = require('./models/Slack');
var Course = require('./models/Course');
var Cluster = require('./helpers/Cluster');

env(__dirname + '/../server.env');
var SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;
var SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
var JWT_SECRET = process.env.JWT_SECRET;
var DB_CONFIG = process.env.DB_CONFIG;
var PORT = process.env.PORT;

mongoose.connect(DB_CONFIG);

var passport = require('passport');
var express = require('express');
var app = express();

var User = require('./models/User');

var apiRoutes = express.Router();
apiRoutes.use(function(req, res, next) {
    var token = req.headers['x-access-token'];

    if(token) {
        jwt.verify(token, JWT_SECRET, function(err, decoded) {
            if(err) {
                return res.json({ok: false, message: 'Failed to authenticate token.'});
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            ok: false,
            message: 'No authentication token provided.'
        });
    }
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.use(passport.initialize());

app.use('/', express.static(path.join(__dirname + '/public')));
app.use('/lib', express.static(path.join(__dirname + '/../node_modules')));

app.use('/client', express.static(path.join(__dirname + '/client')));

apiRoutes.get('/impersonate/:id', function(req, res) {
    var user = req.decoded._doc;
    /*
    if(user.email !== 'ldenison5@gmail.com') {
        res.status(500).json({ok: false});
    }
    else {
    */
        User.findOne({id:req.params.id}, function(err, user) {
            if(err) {
                res.status(500);
                res.send({Error: 'Error impersonating user'});
            }
            else {
                var token = jwt.sign(user, JWT_SECRET, {
                    expiresIn: '7d'
                });
                res.json({token:token});
            }
        });
    //}
});


apiRoutes.get('/user/me', function(req, res) {
    res.json(req.decoded._doc);
});

apiRoutes.post('/course', courseCtrl.create);
apiRoutes.post('/course/:id', courseCtrl.update);
apiRoutes.put('/course',courseCtrl.create);
apiRoutes.get('/course/enrolled',courseCtrl.enrolled);
apiRoutes.get('/course/manages', courseCtrl.manages);
apiRoutes.get('/course/:id',courseCtrl.get);
apiRoutes.get('/course',courseCtrl.index);

apiRoutes.get('/progress',progressCtrl.index);
apiRoutes.get('/progress/:courseId',progressCtrl.getByCourseId);
apiRoutes.post('/progress',progressCtrl.create);
apiRoutes.post('/progress/:id',progressCtrl.update);

apiRoutes.get('/slack/:courseId/sync',slackCtrl.syncMembership);
apiRoutes.get('/slack/:courseId/channels',slackCtrl.createCourseChannels);

apiRoutes.get('/cluster/:courseId', clusterCtrl.getByCourse);

apiRoutes.get('/user',userCtrl.index);
apiRoutes.post('/user/:id', userCtrl.update);

app.get('/auth/slack/callback', function(req, res) {
    // When a user authorizes an app, a code query parameter is passed on the oAuth endpoint. If that code is not there, we respond with an error message
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
    } else {
        // If it's there...

        // We'll do a GET call to Slack's `oauth.access` endpoint, passing our app's client ID, client secret, and the code we just got as query parameters.
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: SLACK_CLIENT_ID, client_secret: SLACK_CLIENT_SECRET}, //Query string data
            method: 'GET' //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                var json = JSON.parse(body);
                if(json.ok) {

                    if(json.bot !== undefined) {
                        var courseId = req.query.state;
                        Course.findOne({_id:courseId}, function(err, course) {
                            if(err) res.status(500).json({ok:false});
                            else {
                                delete json.ok;
                                course.slackConfig = json;

                                slack.users.list(json.access_token, true, function(err, users) {
                                    if(err) res.status(500).json({ok:false});
                                    else {
                                        course.members = users;
                                        course.save(function(err, course) {
                                            if(err) res.status(500).json({ok:false});
                                            else res.redirect('/#!/course/'+courseId+'/member');
                                        });
                                    }
                                });
                            }
                        });
                    }

                    else {
                        var profile = json.user;
                        User.findOrCreate(profile, function(err, user) {
                            if(err) {
                                res.status(500);
                                res.send({Error: 'Error locating / creating profile'});
                            }
                            else {
                                var token = jwt.sign(user, JWT_SECRET, {
                                    expiresIn: '7d'
                                });
                                var uri = '/#!/auth/'+token+'/'+user.is_admin+'/'+user.is_instructor;
                                res.redirect(uri);
                            }
                        });
                    }
                }
            }
        });
    }
});

app.listen(PORT);
setInterval(sync.courseMembership, 100000);