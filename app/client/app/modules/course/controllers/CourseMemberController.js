var CourseMemberController = function($scope, $stateParams, Course, Slack) {
    var courseId = $stateParams.courseId;
    $scope.loading = false;
    $scope.course = Course.get({id:courseId});

    $scope.sync = function() {
        $scope.loading = true;
        Slack.syncMembership({courseId:courseId}).$promise.then(function(course) {
            $scope.course.members = course.members;
            $scope.loading = false;
        });
    };
};

CourseMemberController.$inject = ['$scope','$stateParams','Course','Slack'];
kgroups.controller('CourseMemberController', CourseMemberController);