angular.module('users-delete', []).

config(function config($stateProvider) {
  $stateProvider.state( 'users-delete', {
    
   
    url: '/delete-user/:userId',
    views: {
      "main": {
        controller: 'UsersDeleteCtrl'
      }
    },

    data:{ pageTitle: 'Delete'}
   
   
  });
})

.controller('UsersDeleteCtrl',function($scope, $rootScope, $http, $location, $stateParams){
  $http.delete('/users/'+$stateParams.userId)
  .success(function(){
    $rootScope.flash.message="User Successfully Deleted";
        $rootScope.flash.type="success";
    $location.path('/users');	
  }).error(function(err){
    alert(err);
  });
  
  
    
  
  
});
