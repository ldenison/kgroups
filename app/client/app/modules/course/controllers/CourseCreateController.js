var CourseCreateController = function($scope, $location, Course) {
    $scope.tasks = [{}];

    $scope.date = null;

    $scope.addTask = function(task) {
        $scope.tasks.splice($scope.tasks.indexOf(task)+1,0, {});
        console.log($scope.tasks);
        $scope.tasks.join();
    };

    $scope.createCourse = function(form) {
        form.tasks = $scope.tasks;
        var c = new Course(form);
        c.$save(function(c) {
            var id = c._id;
            $location.path('/course/'+id+'/task');
        });
    };
};

CourseCreateController.$inject = ['$scope','$location','Course'];
kgroups.controller('CourseCreateController', CourseCreateController);