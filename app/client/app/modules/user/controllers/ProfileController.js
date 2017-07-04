var ProfileController = function($scope, User) {
    $scope.user = User.me();
};

ProfileController.$inject = ['$scope', 'User'];
kgroups.controller('ProfileController', ProfileController);