var User = function($resource) {
    return $resource(
        '/api/user/:id',
        {id:'@_id'},
        {
            'me': {method: 'GET', isArray:false, url: '/api/user/me'},
            'impersonate': {method: 'GET', isArray:false, url: '/api/impersonate/:id'}
        });
};

User.$inject = ['$resource'];
kgroups.service('User', User);