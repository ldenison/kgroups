var CourseController = function($scope, $stateParams, Course) {
    var courseId = $stateParams.courseId;
    $scope.course = Course.get({id:courseId});

    $scope.clusters = Course.clusters({id:courseId});

    $scope.addTask = function(task) {
        $scope.course.tasks.splice($scope.course.tasks.indexOf(task)+1,0, {});
        console.log($scope.course.tasks);
        $scope.course.tasks.join();
    };

    $scope.saveCourse = function(course) {
        course.$save();
    };
};

CourseController.$inject = ['$scope','$stateParams','Course'];
kgroups.controller('CourseController', CourseController);