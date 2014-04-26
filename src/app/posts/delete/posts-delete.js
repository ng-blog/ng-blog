angular.module('posts-delete', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-delete', {
    
   
    url: '/delete-post/:postId',
    views: {
      "main": {
        controller: 'PostsDeleteCtrl'
      }
    }, 
    
    data:{ pageTitle: 'Login'}
   
   
  });
})

.controller('PostsDeleteCtrl',function($scope, $rootScope, $http, $location, $stateParams){
  $http.delete('/posts/'+$stateParams.postId)
  .success(function(){
    $rootScope.flash.message="Post Successfully Deleted";
        $rootScope.flash.type="success";
    $location.path('/posts'); 
  });
  
  
    
  
  
});
