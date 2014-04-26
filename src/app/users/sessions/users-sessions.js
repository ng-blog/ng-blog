angular.module('users-sessions', [])

.config(function($stateProvider){

	$stateProvider

	.state( 'users-login', {

    url: '/users/login',
    views: {
      "main": {
        controller: 'UsersLoginCtrl',
        templateUrl: 'users/sessions/users-login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login'}
   
   
  })

	.state('users-logout',{
		url:'/users/logout',
		views:{
			"main":{
				controller: 'UsersLogoutCtrl'
			}
		},

		data:{ pageTitle: 'Logout'}
	});

})

.controller('UsersLoginCtrl', function($scope, $http, $location, $rootScope, dbPath){

	$scope.login=function(){
		//Log in
		$http.post(dbPath.path+'/users/login', {'username':$scope.username, 'password':$scope.password})
		.success(function(result){
			//upon successful login populate the root user object
			$http.get(dbPath.path+"/users/me").success(function(user){
				$rootScope.user=user;
				//redirect...
				if(user.role==="admin" || user.role==="manager"){
					$location.path("/admin/posts");	
				}else{
					$location.path("/posts");	
				}
			});
			
			//set the logged in flat
			$rootScope.isLoggedIn=true;

			
		})
		.error(function(data, status, err, config){
			$rootScope.flash.message="Invalid username or password please try again.";
			$rootScope.flash.type="danger";

		});
	};
})

.controller('UsersLogoutCtrl', function($scope, $http, $location, $rootScope, dbPath){

	$http.post(dbPath.path+'/users/logout')
	.success(function(){
		//remove logout flag, and remove root user object;
		$rootScope.isLoggedIn=false;
		$rootScope.user=false;
		$location.path('/users/login');

	})
	.error(function(){
		alert('Unable to log you out.');
	});

});