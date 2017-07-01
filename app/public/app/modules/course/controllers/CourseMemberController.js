var CourseMemberController = function($scope, $stateParams, Course) {
    var courseId = $stateParams.courseId;
    $scope.course = Course.get({id:courseId});
};

CourseMemberController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseMemberController', CourseMemberController);