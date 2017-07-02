module.exports = {
    dist: {
        src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/ngstorage/ngStorage.min.js',
            'node_modules/angular-resource/angular-resource.min.js'
        ],
        dest: 'app/public/lib/lib.min.js'
    }
};