var courseNav = function() {
    return {
        templateUrl: 'app/modules/course/directives/courseNav/courseNav.html',
        controller: ['$scope','$state', function($scope, $state) {
            $scope.page = $state.current.name;

            $scope.$watch('page', function(oldVal, newVal) {
                if(newVal !== oldVal) {
                    $scope.page = newVal;
                }
            });
            console.log($scope.page);
        }]
    };
};

kgroups.directive('courseNav', courseNav);