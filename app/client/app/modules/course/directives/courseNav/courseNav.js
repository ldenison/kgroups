var courseNav = function() {
    return {
        templateUrl: 'app/modules/course/directives/courseNav/courseNav.html',
        controller: ['$scope','$state', function($scope, $state) {
            $scope.page = $state.current.name;

            $scope.$watch(function() {
                return $state.current.name;
            }, function(newVal, oldVal) {
                if(newVal !== oldVal) {
                    $scope.page = $state.current.name;
                }
            });
        }]
    };
};

kgroups.directive('courseNav', courseNav);