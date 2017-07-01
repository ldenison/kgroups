var dependencies = [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'ngResource'
];
var kgroups = angular.module('kgroups', dependencies);

kgroups.run(function($rootScope, $http, $location, $localStorage) {
    if($localStorage.token) {
        $http.defaults.headers.common['x-access-token'] = $localStorage.token;
    }
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/','/login','/login-failed','/auth'];
        var path = "/" + $location.path().split('/')[1];
        var restrictedPage = publicPages.indexOf(path) === -1;
        if(restrictedPage && !$localStorage.token) {
            $location.path('/login');
        }
    });

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            $state.current = toState;
        }
    );
});

kgroups.config(function($httpProvider) {
    $httpProvider.interceptors.push('ResponseObserver');
});