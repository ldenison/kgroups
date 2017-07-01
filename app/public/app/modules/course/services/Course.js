var Course = function($resource) {
    return $resource(
        '/api/course/:id',
        {id:'@_id'},
        {
            'enrolled': {method: 'GET', isArray:true, url: '/api/course/enrolled'},
            'progress': {method: 'GET', url: '/api/course/:id/progress'}
        });
};

Course.$inject = ['$resource'];
kgroups.service('Course', Course);