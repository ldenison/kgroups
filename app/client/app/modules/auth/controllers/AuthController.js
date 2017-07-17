var AuthController = function($scope, $location, $stateParams, $localStorage, $timeout, $http) {
    var token = $stateParams.token;
    var is_admin = $stateParams.admin === 'true';
    var is_instructor = $stateParams.instructor === 'true';

    console.log($stateParams);

    console.log(is_admin);
    console.log(is_instructor);
    $timeout(function() {
        $localStorage.token = token;
        $localStorage.is_admin = is_admin;
        $localStorage.is_instructor = is_instructor;
        $http.defaults.headers.common['x-access-token'] = $localStorage.token;
        $location.url('/progress');
    });
};

AuthController.$inject = ['$scope', '$location', '$stateParams', '$localStorage','$timeout','$http'];
kgroups.controller('AuthController', AuthController);