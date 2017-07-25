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

    $scope.grantAdmin = function(user) {
        user.is_admin = true;
        user.$save().then(function(res) {
            user = res;
        });
    };
    $scope.revokeAdmin = function(user) {
        user.is_admin = false;
        user.$save().then(function(res) {
            console.log(res);
            user = res;
        });
    };
    $scope.grantInstructor = function(user) {
        user.is_instructor = true;
        user.$save().then(function(res) {
            user = res;
        });
    };
    $scope.revokeInstructor = function(user) {
        user.is_instructor = false;
        user.$save().then(function(res) {
            user = res;
        });
    };
};

AdminController.$inject = ['$scope','$localStorage','$timeout','$http','User'];
kgroups.controller('AdminController', AdminController);