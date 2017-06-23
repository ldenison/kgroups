kgroups.config(function($stateProvider) {
    var progressIndex = {
        name: 'progressIndex',
        url: '/progress',
        templateUrl: '/app/modules/progress/views/index.html',
        controller: 'ProgressIndexController'
    };

    var progressView = {
        name: 'progressView',
        url: '/report/:reportId',
        templateUrl: 'app/modules/progress/views/view.html',
        controller: 'ProgressController'
    };

    $stateProvider.state(progressIndex);
    $stateProvider.state(progressView);
});