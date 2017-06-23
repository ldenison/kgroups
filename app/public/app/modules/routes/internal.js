kgroups.config(function($stateProvider) {
    var profile = {
        name: 'profile',
        url: '/profile',
        templateUrl: 'app/modules/user/views/profile.html',
        controller: 'ProfileController'
    };

    var authed = {
        name: 'authed',
        url: '/auth/:token',
        controller: 'AuthController'
    };

    $stateProvider.state(profile);
    $stateProvider.state(authed);
});