angular.module('posts-edit', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-edit', {
    
    resolve:{

      post:function(getSinglePost, $stateParams){
        return getSinglePost.init($stateParams.postSlug);
      }

    },
   

    url: '/edit-post/:postSlug',
    views: {
      "main": {
        controller: 'PostsEditCtrl',
        templateUrl: 'posts/edit/posts-edit.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit Post'}
   
   
  });
})

.controller('PostsEditCtrl',function($scope, $rootScope, $http, $location, post){
  $scope.post= post.data[0];

   $scope.$watch('post.title', function(){
    $scope.post.slug = $scope.post.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-\_ ]/g, '').toLowerCase();
  });


  $scope.postUpdate=function(){

      if($scope.post.tags.length>0){
          
          if(typeof($scope.post.tags)==='string'){
            $scope.post.tags = $scope.post.tags.split(",");    
          }
          
      }else{
        $scope.post.tags=[];
      }

    var data =  {
    'title':$scope.post.title, 
    'body':$scope.post.body, 
    'slug':$scope.post.slug,
    'tags':$scope.post.tags
  };

    $http.put('/posts/'+$scope.post.id, data).success(function(){
      $rootScope.flash.message="Post Updated";
      $rootScope.flash.type="success";
      $location.path('/post/'+$scope.post.slug);  
    }).error(function(err){
       $rootScope.flash.message=err.message;
      $rootScope.flash.type="danger";
    });
    
  };
  
    
  
  
});
