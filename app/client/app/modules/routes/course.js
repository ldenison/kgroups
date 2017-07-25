kgroups.config(['$stateProvider', function($stateProvider) {

    var courseIndex = {
        name: 'courseIndex',
        url: '/course',
        templateUrl: 'app/modules/course/views/index.html',
        controller: 'CourseIndexController'
    };

    var courseCreate = {
        name: 'courseCreate',
        url: '/course/create',
        templateUrl: 'app/modules/course/views/create.html',
        controller: 'CourseCreateController'
    };

    var courseView = {
        abstract: true,
        name: 'course',
        url: '/course/:courseId',
        templateUrl: 'app/modules/course/views/template.html'
    };

    var courseViewTask = {
        name: 'course.task',
        url: '/task',
        templateUrl: 'app/modules/course/views/task.html',
        controller: 'CourseTaskController'
    };

    var courseViewMember = {
        name: 'course.member',
        url: '/member',
        templateUrl: 'app/modules/course/views/member.html',
        controller: 'CourseMemberController'
    };

    var courseViewConfig = {
        name: 'course.config',
        url: '/config',
        templateUrl: 'app/modules/course/views/config.html',
        controller: 'CourseController'
    };

    var courseViewCluster = {
        name: 'course.cluster',
        url: '/cluster',
        templateUrl: 'app/modules/course/views/cluster.html',
        controller: 'CourseClusterController'
    };

    $stateProvider.state(courseCreate);
    $stateProvider.state(courseIndex);

    $stateProvider.state(courseView);
    $stateProvider.state(courseViewTask);
    $stateProvider.state(courseViewMember);
    $stateProvider.state(courseViewConfig);
    $stateProvider.state(courseViewCluster);
}]);