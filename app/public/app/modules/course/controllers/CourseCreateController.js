var CourseCreateController = function($scope, Course) {
    $scope.tasks = [{}];

    $scope.date = null;

    $scope.addTask = function(task) {
        $scope.tasks.splice($scope.tasks.indexOf(task)+1,0, {});
        console.log($scope.tasks);
        $scope.tasks.join();
    };

    var course = {
        name: 'Machine Learning',
        courseNumber: 'CS8718',
        tasks: [{order:0, body: 'Lecture 01', due: new Date()}]
    };
    var c = Course.query({id:'594c6615891d97c705128118'}).$promise.then(function(c) {
        console.log(c);
    });

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