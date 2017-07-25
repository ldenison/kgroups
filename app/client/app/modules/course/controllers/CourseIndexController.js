var CourseIndexController = function($scope, $stateParams, Course) {
    $scope.loading = true;
    $scope.courses = Course.manages().$promise.then(function(res) {
        $scope.loading = false;
        $scope.courses = res;
    });
};

CourseIndexController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseIndexController', CourseIndexController);