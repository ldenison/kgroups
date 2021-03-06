kgroups.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var login = {
        name: 'login',
        url: '/',
        templateUrl: 'app/modules/external/views/login.html'
    };

    var sigin_failed = {
        name: 'signin-failed',
        url: '/signin-failed',
        templateUrl: 'app/modules/external/views/signin-failed.html'
    };

    $stateProvider.state(login);
    $stateProvider.state(sigin_failed);

    $urlRouterProvider.otherwise('/');
}]);