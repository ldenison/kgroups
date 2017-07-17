var CourseIndexController = function($scope, $stateParams, Course) {
    console.log('test');
    $scope.courses = Course.manages();
};

CourseIndexController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseIndexController', CourseIndexController);