var CourseClusterController = function($scope, $stateParams, Course, Slack) {
    var courseId = $stateParams.courseId;
    $scope.loading = true;
    Course.get({id:courseId}).$promise.then(function(course) {
        $scope.course = course;
        $scope.members = {};
        for(var i=0; i<$scope.course.members.length; i++) {
            $scope.members[$scope.course.members[i].id] = $scope.course.members[i];
        }
    });

    $scope.clusters = Course.clusters({id:courseId}).$promise.then(function(res) {
        $scope.clusters = res;
        $scope.loading = false;
    });

    $scope.addTask = function(task) {
        $scope.course.tasks.splice($scope.course.tasks.indexOf(task)+1,0, {});
        console.log($scope.course.tasks);
        $scope.course.tasks.join();
    };

    $scope.saveCourse = function(course) {
        for(var i=0; i<course.tasks.length; i++) {
            if(course.tasks[i].due) {
                course.tasks[i].due = new Date(course.tasks[i].due).toISOString();
            }
        }
        course.$save();
    };

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