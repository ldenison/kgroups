var km = require('node-kmeans');
var Course = require('../models/Course');
var Progress = require('../models/Progress');
var User = require('../models/User');
var PER_GROUP = 2;

var transform = function(report) {
    var vect = [];
    for(var i=0; i<report.tasks.length; i++) {
        var t = report.tasks[i];
        if(t.status === 'Not Started') vect.push(0.0);
        if(t.status === 'In Progress') vect.push(1.0);
        if(t.status === 'Completed') vect.push(2.0);
    }
    return vect;
};

exports.cluster = function(courseId, cb) {
     return Progress.find({course:courseId}, function(err, reports) {
        if(err) {
            console.log(err);
            cb(err);
        }
        else {
            var num_groups;
            var num_students = reports.length;
            if(num_students <= PER_GROUP) {
                num_groups = 1;
            }
            else {
                num_groups = Math.ceil(num_students / PER_GROUP);
            }
            var data = [];
            for(var i=0; i<reports.length; i++) {
                data.push(transform(reports[i]));
            }
            km.clusterize(data, {k: num_groups}, function(err, res) {
                if(err) {
                    console.log(err);
                    cb(err);
                }
                else {
                    var clusters = [];
                    for(var i=0; i<res.length; i++) {
                        var cluster = [];
                        for(var j=0; j<res[i].clusterInd.length; j++) {
                            var ind = res[i].clusterInd[j];
                            var report = reports[ind];
                            cluster.push(report);
                        }
                        clusters.push(cluster);
                    }
                    return cb(undefined, clusters);
                }
            });
        }
     });
};
