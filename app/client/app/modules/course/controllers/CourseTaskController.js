var CourseTaskController = function($scope, $stateParams, Course) {
    var courseId = $stateParams.courseId;
    $scope.saveState = {msg:'Save Changes',state:0};
    $scope.loading = true;
    $scope.course = Course.get({id:courseId}).$promise.then(function(res) {
        $scope.loading = false;
        $scope.course = res;
    });

    $scope.addTask = function(task) {
        $scope.course.tasks.splice($scope.course.tasks.indexOf(task)+1,0, {});
        console.log($scope.course.tasks);
        $scope.course.tasks.join();
    };

    $scope.removeTask = function(task) {
        $scope.course.tasks.splice($scope.course.tasks.indexOf(task), 1);
    };

    $scope.saveCourse = function(course) {
        $scope.saveState.msg = 'Saving...';
        $scope.saveState.state = 1;
        course.$save().then(function() {
            $scope.saveState.msg = 'Save Changes';
            $scope.saveState.state = 0;
        });
    };
};

CourseTaskController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseTaskController', CourseTaskController);