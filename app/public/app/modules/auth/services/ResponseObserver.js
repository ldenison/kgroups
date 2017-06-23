var ResponseObserver = function($q, $location) {
    return {
        'responseError': function(errorResponse) {
            switch(errorResponse.status) {
                case 403:
                    console.log('API Access denied');
                    $location.path('/login');
            }
            return $q.reject(errorResponse);
        }
    };
};

ResponseObserver.$inject = ['$q','$location'];
kgroups.factory('ResponseObserver', ResponseObserver);