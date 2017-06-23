var AuthController = function($scope, $location, $stateParams, $localStorage) {
    var token = $stateParams.token;
    console.log(token);
    $localStorage.token = token;
    $location.url('/progress');
};

AuthController.$inject = ['$scope', '$location', '$stateParams', '$localStorage'];
kgroups.controller('AuthController', AuthController);