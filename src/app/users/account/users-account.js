angular.module('users-account', []).

config(function config($stateProvider) {
  $stateProvider

  .state( 'users-account', {
    
    resolve:{

      user:function(getSingleUser, $stateParams){
        return getSingleUser.init($stateParams.userId);
      }

    },
   

    url: '/account/:userId',
    views: {
      "main": {
        controller: 'UsersAccountCtrl',
        templateUrl: 'users/account/users-account.tpl.html'
      }
    },
    data:{ pageTitle: 'Account'}
   
   
  });
})

.controller('UsersAccountCtrl',function($scope, $http, $location, $rootScope, $timeout, user){




  $scope.authUser = $rootScope.user;
  $scope.user= user.data;
  $scope.questions=$scope.user.questions;
 console.log($scope.user);
  if($scope.authUser.id!==$scope.user.id){
      $rootScope.flash.type="danger";
      $rootScope.flash.message="You are not permitted to access this page";
      $location.path('/posts');
  }

  $scope.userUpdate=function(){
    var data={
      'username':$scope.user.username, 
      'email':$scope.user.email,
      'questions':$scope.questions
    };

    
      if($scope.password!==""){
        data.password = $scope.password;  
      }
      
    

    $http.post('/users/'+$scope.user.id, data)
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
