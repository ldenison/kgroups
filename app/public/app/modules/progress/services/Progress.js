var Progress = function($resource) {
    return $resource('/api/progress/:id');
};
Progress.$inject = ['$resource'];
kgroups.service('Progress',Progress);