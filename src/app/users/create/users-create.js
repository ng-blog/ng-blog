angular.module('users-create', []).

config(function config($stateProvider) {
  $stateProvider.state( 'users-create', {
    

    url: '/create-user',
    views: {
      "main": {
        controller: 'UsersCreateCtrl',
        templateUrl: 'users/create/users-create.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Account'}
   
   
  });
})

.controller('UsersCreateCtrl',function($scope, $http, $location, $rootScope, $timeout){
  $scope.role="empty";
  $scope.roles=[
  {"value":"empty", "name":"- Select a Role -" },
  {"value":"admin", "name":"Admin" },
  {"value":"manager", "name":"Manager" }

  ];

    $scope.createUser=function(){
      var data={
        'username':$scope.username,  
        'email':$scope.email, 
        'role':$scope.role
      };
      $http.post('/createuser',data)
      .success(function(result){
        $rootScope.flash.message="User Successfully Saved";
        $rootScope.flash.type="success";
        $timeout(function(){$location.path('/users');}, 3500);
        
      }).error(function(err){
        $rootScope.flash.type="danger";
        $rootScope.flash.message=err.message;
        
      });


      
    };
  
});
