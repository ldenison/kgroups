var CourseCreateController = function($scope, Course) {
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
            console.log(c);
        });
    };
};

CourseCreateController.$inject = ['$scope','Course'];
kgroups.controller('CourseCreateController', CourseCreateController);