var topNav = function() {
    return {
        templateUrl: 'app/modules/navs/directives/topNav/topNav.html',
        controller: ['$scope','$state','$location','$localStorage','$http', function($scope, $state, $location, $localStorage, $http) {
            $scope.page = $state.current.name;

            $scope.is_admin = $localStorage.is_admin;
            $scope.is_instructor = $localStorage.is_instructor;

            console.log($scope.is_instructor);

            $scope.$watch(function() {
                return $state.current.name;
            }, function(newVal, oldVal) {
                if(newVal !== oldVal) {
                    $scope.page = $state.current.name;
                }
            });

            $scope.isCourseSubPage = function() {
                var p = $scope.page;
                return p === 'courseIndex' || p === 'courseCreate' || p === 'course.task' || p === 'course.member' ||
                        p === 'course.cluster' || p === 'course.config';
            };


            $scope.logout = function() {
                delete $http.defaults.headers.common['x-access-token'];
                $localStorage.$reset();
                $location.path('/login');
            };
        }]
    };
};

kgroups.directive('topNav', topNav);