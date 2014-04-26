angular.module('users-edit', []).

config(function config($stateProvider) {
  $stateProvider

  .state( 'users-edit', {
    
    resolve:{

      user:function(getSingleUser, $stateParams){
        return getSingleUser.init($stateParams.userId);
      }

    },
   

    url: '/edit-user/:userId',
    views: {
      "main": {
        controller: 'UsersEditCtrl',
        templateUrl: 'users/edit/users-edit.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit User'}
   
   
  });
})

.controller('UsersEditCtrl',function($scope, $http, $location, $rootScope, $timeout, user){
  $scope.authUser = $rootScope.user;
  $scope.user= user.data;
   $scope.roles=[
    {"value":"empty", "name":"- Select a Role -" },
    {"value":"admin", "name":"Admin" },
    {"value":"manager", "name":"Manager" },
    {"value":"user", "name":"User"}
  ];

  /*====If you have an ng-model inside of ng-if you need to do the below ====*/
 
  //ng-model: password input -  is in ng-if
  //we need to emit password up to $scope.password
 
 /* $scope.emitPassword=function(password){
    this.$emit('UPDATE_PASSWORD', password);
  };
  $scope.$on('UPDATE_PASSWORD', function(event, password){
    $scope.password = password;
  });*/

  $scope.userUpdate=function(){
    var data={
      'username':$scope.user.username, 
      'email':$scope.user.email,
      'role': $scope.user.role,
      'id':$scope.user.id
    };

    if($rootScope.id===user.id){

      data.password = $scope.password;
    }

    $http.post('/updateuser', data)
      .success(function(result){
  
        $rootScope.flash.message="User Successfully Updated";
        $rootScope.flash.type="success";
        
        //$timeout(function(){$location.path('/users');}, 3500);
        
      })
      .error(function(err){
        $rootScope.flash.type="danger";
        $rootScope.flash.message=err.message;

      });
  
  };
    
  
  
});
