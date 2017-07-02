var ProgressController = function($scope, $stateParams, $interval, Progress, Course) {
    var courseId = $stateParams.courseId;
    var needsUpdate = false;

    var getTaskById = function(id, list) {
        if(list) {
            for(var i=0; i<list.length; i++) {
                if (list[i].taskId === id) {
                    return list[i];
                }
            }
        }
        return false;
    };

    Course.get({id:courseId}).$promise.then(function(course) {
        $scope.course = course;
        Progress.get({id:courseId}).$promise.then(function(progress) {
            $scope.progress = progress;
            for(var i=0; i<course.tasks.length; i++) {
                var t = getTaskById(course.tasks[i]._id, progress.tasks);
                console.log(t);
                if(t) {
                    course.tasks[i].status = t.status;
                }
                else course.tasks[i].status = 'Not Started';
            }
        });
    });

    $scope.updateStatus = function(task) {
        needsUpdate = true;
        switch(task.status) {
            case undefined:
                task.status = 'In Progress';
                break;
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

    var updateTasks = function() {
        if(needsUpdate) {
            var tasks = [];
            for(var i=0; i<$scope.course.tasks.length; i++) {
                var id = $scope.course.tasks[i]._id;
                var status = $scope.course.tasks[i].status;
                if(status===undefined) status = 'Not Started';
                tasks.push({taskId:id, status:status});
                $scope.progress.tasks = tasks;
            }
            if($scope.progress._id === undefined) {
                $scope.progress.course = $scope.course._id;
            }
            console.log($scope.progress);
            $scope.progress.$save();
            needsUpdate = false;
        }
    };

    $interval(updateTasks, 500);

};
ProgressController.$inject = ['$scope','$stateParams','$interval','Progress','Course'];
kgroups.controller('ProgressController',ProgressController);