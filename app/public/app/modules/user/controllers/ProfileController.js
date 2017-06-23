var ProfileController = function($scope, User, $localStorage) {
    //delete $localStorage.token;
    console.log($localStorage.token);
    $scope.user = User.get();
};

ProfileController.$inject = ['$scope', 'User','$localStorage'];
kgroups.controller('ProfileController', ProfileController);