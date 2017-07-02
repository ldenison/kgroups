var AuthController = function($scope, $location, $stateParams, $localStorage, $timeout, $http) {
    var token = $stateParams.token;
    $timeout(function() {
        $localStorage.token = token;
        $http.defaults.headers.common['x-access-token'] = $localStorage.token;
        $location.url('/progress');
    });
};

AuthController.$inject = ['$scope', '$location', '$stateParams', '$localStorage','$timeout','$http'];
kgroups.controller('AuthController', AuthController);