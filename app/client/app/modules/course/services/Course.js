var Course = function($resource) {
    return $resource(
        '/api/course/:id',
        {id:'@_id'},
        {
            'enrolled': {method: 'GET', isArray:true, url: '/api/course/enrolled'},
            'manages': {method: 'GET', isArray:true, url: '/api/course/manages'},
            'clusters': {method: 'GET', isArray: true, url: '/api/cluster/:id'}
        });
};

Course.$inject = ['$resource'];
kgroups.service('Course', Course);