var Slack = function($resource) {
    return $resource(
        '/api/slack/:courseId',
        {courseId:'@courseId'},
        {
            'syncMembership': {method: 'GET', isArray:false, url: '/api/slack/:courseId/sync'}
        });
};

Slack.$inject = ['$resource'];
kgroups.service('Slack', Slack);