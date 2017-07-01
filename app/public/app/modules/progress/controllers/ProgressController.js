var ProgressController = function($scope, $stateParams, Progress, Course) {
    var courseId = $stateParams.courseId;
    $scope.report = Course.progress({id:courseId});

    $scope.getTaskById = function(tasks, id) {
          for(var i=0; i<tasks.length; i++) {
              if(tasks[i]._id === id) {
                  return tasks[i];
              }
          }
          return {_id:id, status: 'Not Started'};
    };

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
ProgressController.$inject = ['$scope','$stateParams','Progress','Course'];
kgroups.controller('ProgressController',ProgressController);