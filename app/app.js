c

var SlackStrategy = require('passport-slack').Strategy;
var passport = require('passport');
var express = require('express');
var app = express();

// setup the strategy using defaults
passport.use(new SlackStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET
    }, function (accessToken, refreshToken, profile, done){
        // optionally persist profile data
        done(null, profile);
        }
));

app.use(passport.initialize());
app.use(require('body-parser').urlencoded({ extended: true }));

// path to start the OAuth flow
app.get('/auth/slack', passport.authorize('slack'));

// OAuth callback url
app.get('/auth/slack/callback',
    passport.authorize('slack', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/')
    }
);

app.listen(PORT);