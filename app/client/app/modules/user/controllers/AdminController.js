var AdminController = function($scope, $localStorage, $timeout, $http, User) {
    $scope.users = User.query();

    $scope.impersonate = function(id) {
        User.impersonate({id:id}).$promise.then(function(resp) {
            var token = resp.token;
            $localStorage.token = token;

            $timeout(function() {
                $localStorage.token = token;
                $http.defaults.headers.common['x-access-token'] = $localStorage.token;
            });

        });
    };
};

AdminController.$inject = ['$scope','$localStorage','$timeout','$http','User'];
kgroups.controller('AdminController', AdminController);