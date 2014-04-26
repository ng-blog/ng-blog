angular.module('users-forgot-password', [])

.config(function($stateProvider){

	$stateProvider

	.state( 'users-forgot-password', {

    url: '/forgot-password',
    views: {
      "main": {
        controller: 'UsersPasswordCtrl',
        templateUrl: 'users/forgot-password/users-forgot-password.tpl.html'
      }
    },
    data:{ pageTitle: 'Forgot Password'}
   
   
  });


})

.controller('UsersPasswordCtrl', function($scope, $http, $location, $rootScope, dbPath){
	$scope.questions=false;
	$scope.firstQuestion =true;
	$scope.checkEmail=function(){
			$http.get(dbPath.path+"/resetpassword?email="+$scope.email)

			.success(function(data){
				$scope.questions=data;	
			})
			.error(function(err){
				$rootScope.flash.type="danger";
				$rootScope.flash.message=err.message;

			});
	};

	$scope.checkAnswers=function(){
		var idx;
		if($scope.firstQuestion){idx = 0;}else{idx = 1;}

			$http.get(dbPath.path+"/resetpassword?email="+$scope.email+"&answer="+idx+"_"+$scope.answer)

			.success(function(data){
				$rootScope.flash.type="success";
				$rootScope.flash.message="Password reset email sent to "+$scope.email;
			})
			.error(function(err){
				$rootScope.flash.type="danger";
				$rootScope.flash.message=err.message;

			});
	};

	$scope.newQuestion=function(){
		$scope.firstQuestion = !$scope.firstQuestion;
	};
});

	