var CourseClusterController = function($scope, $stateParams, Course, Slack) {
    var courseId = $stateParams.courseId;
    $scope.loading = true;
    $scope.clusters = Course.clusters({id:courseId}).$promise.then(function(res) {
        $scope.clusters = res;
        $scope.loading = false;
    });
    $scope.getUserById = function(id) {
        for(var i=0; i<$scope.course.members.length; i++) {
            if(id === $scope.course.members._id) {
                return $scope.course.members;
            }
        }
    };

    $scope.createChannels = function() {
        Slack.createChannels({courseId:courseId});
    };
};

CourseClusterController.$inject = ['$scope','$stateParams','Course','Slack'];
kgroups.controller('CourseClusterController', CourseClusterController);