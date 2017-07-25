var ProgressIndexController = function($scope, Course) {
    $scope.loading = true;
    $scope.courses = Course.enrolled().$promise.then(function(res) {
        $scope.courses = res;
        $scope.loading = false;
    });
};
ProgressIndexController.$inject = ['$scope', 'Course'];
kgroups.controller('ProgressIndexController', ProgressIndexController);