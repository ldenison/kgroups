kgroups.config(['$stateProvider', function($stateProvider) {
    var profile = {
        name: 'profile',
        url: '/profile',
        templateUrl: 'app/modules/user/views/profile.html',
        controller: 'ProfileController'
    };

    var authed = {
        name: 'authed',
        url: '/auth/:token/:admin/:instructor',
        controller: 'AuthController'
    };

    var admin = {
        name: 'admin',
        url: '/admin',
        templateUrl: 'app/modules/user/views/admin.html',
        controller: 'AdminController'
    };

    $stateProvider.state(profile);
    $stateProvider.state(authed);
    $stateProvider.state(admin);
}]);