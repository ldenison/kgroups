var ReportController = function($scope, $stateParams, Report) {
    $scope.updateStatus = function(task) {
        switch(task.status) {
            case 'Not Started':
                task.status = 'In Progress';
                break;
            case 'In Progress':
                task.status = 'Completed';
                break;
            case 'Completed':
                task.status = 'Not Started';
                break;
            default:
                task.status = 'Not Started';
                break;
        }
    };
};
ReportController.$inject = ['$scope','$stateParams','Report'];
kgroups.controller('ReportController',ReportController);