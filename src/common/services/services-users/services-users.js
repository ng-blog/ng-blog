angular.module('services-users',[])

.service('getMe',function($http, dbPath){
	this.init=function(){
		return $http.get(dbPath.path+'/users/me');
	};
})

.service('getAllUsers',function($http, $rootScope, $window, $location, $timeout, dbPath){
	this.init=function(){
		return $http.get(dbPath.path+'/getallusers')
		.success(function(result){
  
			$rootScope.flash.message="Welcome, "+ $rootScope.user.username;
			$rootScope.flash.type="success";
        })
      .error(function(err){
        $rootScope.flash.type="danger";
        $rootScope.flash.message=err.message;
        $window.location.hash="/posts";
        });
	};
})

.service('getSingleUser', function($http, dbPath){
	this.init = function(id){
	return $http.get(dbPath.path+'/users/'+id);
	};
});