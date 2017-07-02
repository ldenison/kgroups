module.exports = function(grunt) {
    function loadConfig(path) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }
    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('tasks');

    config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env
    };
    grunt.util._.extend(config, loadConfig('./tasks/config/'));

    grunt.initConfig(config);
};

