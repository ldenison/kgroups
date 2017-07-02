kgroups.config(['$stateProvider', function($stateProvider) {
    var progressIndex = {
        name: 'progressIndex',
        url: '/progress',
        templateUrl: '/app/modules/progress/views/index.html',
        controller: 'ProgressIndexController'
    };

    var progressView = {
        name: 'progressView',
        url: '/progress/:courseId',
        templateUrl: 'app/modules/progress/views/view.html',
        controller: 'ProgressController'
    };

    $stateProvider.state(progressIndex);
    $stateProvider.state(progressView);
}]);