var Progress = function($resource) {
    return $resource('/api/progress/:id', {id:'@_id'});
};
Progress.$inject = ['$resource'];
kgroups.service('Progress',Progress);