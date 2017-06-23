var ProgressIndexController = function($scope, Progress, Course) {
    $scope.reports = Progress.query();
    $scope.courses = Course.enrolled();
};
ProgressIndexController.$inject = ['$scope', 'Progress','Course'];
kgroups.controller('ProgressIndexController', ProgressIndexController);