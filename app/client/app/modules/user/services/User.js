var User = function($resource) {
    return $resource('/api/me');
};

User.$inject = ['$resource'];
kgroups.service('User', User);