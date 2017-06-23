var CourseIndexController = function($scope, $stateParams, Course) {
    $scope.courses = Course.query();
};

CourseIndexController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseIndexController', CourseIndexController);