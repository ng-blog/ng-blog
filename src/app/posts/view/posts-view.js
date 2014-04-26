angular.module('posts-view', []).

config(function config($stateProvider) {
  $stateProvider

  .state( 'posts-view', {
    
    resolve:{
        post:function(getSinglePost, $stateParams){
          return getSinglePost.init($stateParams.postSlug);
        }
      },

    url: '/post/:postSlug',
    views: {
      "main": {
        controller: 'PostsViewCtrl',
        templateUrl: 'posts/view/posts-view.tpl.html'
      }
    },
    data:{ pageTitle: 'Post'}
   
   
  })

  .state( 'page-view', {
    
    resolve:{
        post:function(getSinglePost, $stateParams){
          return getSinglePost.init($stateParams.postSlug);
        }
      },

    url: '/page/:postSlug',
    views: {
      "main": {
        controller: 'PostsViewCtrl',
        templateUrl: 'posts/view/posts-view.tpl.html'
      }
    },
    data:{ pageTitle: 'Post'}
   
   
  })

.state( 'posts-home', {
    
    resolve:{
        post:function(getHomePage, getBlogPosts){
         return getHomePage.init();         
          
        }
      },

    url: '/home',
    views: {
      "main": {
        controller: 'PostsViewCtrl',
        templateUrl: 'posts/view/posts-view.tpl.html'
      }
    },
    data:{ pageTitle: 'Home'}
   
   
  });
})

.controller('PostsViewCtrl',function($scope, $location, post){
    if(post.data.length===0){
      $location.path('/posts');

    }else{
      $scope.tagsExist=false;
      
      $scope.post=post.data[0];
      if($scope.post.tags.length>0){
        $scope.tagsExist=true;
      }  
    }

    
  
  
});
