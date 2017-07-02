var topNav = function() {
    return {
        templateUrl: 'app/modules/navs/directives/topNav/topNav.html',
        controller: ['$scope','$location','$localStorage','$http', function($scope, $location, $localStorage, $http) {
            $scope.logout = function() {
                console.log('logging out');
                delete $http.defaults.headers.common['x-access-token'];
                $localStorage.$reset();
                console.log($localStorage.token);
                console.log($http.defaults.headers.common['x-access-token']);
                $location.path('/login');
            };
        }]
    };
};

kgroups.directive('topNav', topNav);