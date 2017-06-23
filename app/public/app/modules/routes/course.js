kgroups.config(function($stateProvider) {
    var courseIndex = {
        name: 'courseIndex',
        url: '/course',
        templateUrl: 'app/modules/course/views/index.html',
        controller: 'CourseIndexController'
    };

    var course = {
        name: 'course',
        url: '/course/:courseId',
        templateUrl: 'app/modules/course/views/view.html',
        controller: 'CourseController'
    };
    var courseCreate = {
        name: 'courseCreate',
        url: '/course/create',
        templateUrl: 'app/modules/course/views/create.html',
        controller: 'CourseCreateController'
    };

    $stateProvider.state(courseCreate);
    $stateProvider.state(course);
    $stateProvider.state(courseIndex);

});