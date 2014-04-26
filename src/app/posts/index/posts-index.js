angular.module('posts-index', []).

config(function($stateProvider) {
  $stateProvider.state( 'admin-posts-index', {
    
    resolve:{
      posts:  function(getPosts){
            /*Admin mode returns all posts regardless of post_type*/
            return getPosts.init();
         }
      },

    url: '/admin/posts',
    views: {
      "main": {
        controller: 'PostsIndexCtrl',
        templateUrl: 'posts/index/posts-index.tpl.html'
      }
    },
    data:{ pageTitle: 'Admin - Blog Posts'}
   
   
  })


  .state( 'posts-index', {
    
    resolve:{
      posts:  function(getBlogPosts){
           
           
           /*In order to cut down on then number of requests to mongo server
            this getBlogPosts has been commented out since we have the blog posts 
            store in $rootScope.blogPosts ...
           */
            //return getBlogPosts.init();
         }
      },

    url: '/posts',
    views: {
      "main": {
        controller: 'PostsIndexCtrl',
        templateUrl: 'posts/index/posts-index.tpl.html'
      }
    },
    data:{ pageTitle: 'All Posts'}
   
   
  })

  
  .state( 'posts-index-tags', {
    
    resolve:{
      posts:  function(postsByTag, $stateParams){
           /*--Filter a mongo blog post get request by selected tag--*/
            return postsByTag.init($stateParams.tag);
         }
      },

    url: '/posts/tags/:tag',
    views: {
      "main": {
        controller: 'PostsIndexCtrl',
        templateUrl: 'posts/index/posts-index.tpl.html'
      }
    },
    data:{ pageTitle: 'Posts by Tag'}
   
   
  });
})

.controller('PostsIndexCtrl',function($scope, $state, $rootScope, $stateParams, posts, getMe){
    $scope.tagFilter=false;

    //Redirect non-admin users
    if($state.current.url==='/admin/posts'){
        getMe.init().then(function(user){
          if(user.data.role!=='admin' && user.data.role!=='manager'){
            $scope.notAuthorized();
          }
        });
    }


    /*
    Sometimes when this page is loaded the $rootScope.blogPosts wasn't populated.
    Watch this value and when it changes to a non-undefined state then apply it's contents 
    to local scope and run other dependent logic.

    */
    $rootScope.$watch('blogPosts', function(newVal){
      if(typeof(newVal)!=='undefined'){
        $scope.setBlogPosts();
      }
      
    });
    
     $scope.setBlogPosts=function(){
      /*When this function runs we know we 
      have data in $rootScope.blogPosts....
      */

      $scope.posts = $rootScope.blogPosts; 

      /*$scope.tags should always show all tags associated with all the posts*/
       $scope.tags=$rootScope.blogPosts;
       $scope.setCategories();


      //if we are filtering by tag...
      if(typeof($stateParams.tag)!=='undefined'){
        //set tagFilter to tru...
        $scope.tagFilter=true;
       
        /*$scope.posts is instead assigned to the 
          return value of postByTag.init()...
        */
        $scope.posts=posts.data;
      
        }else if($state.current.url==='/admin/posts'){
          $scope.posts=posts.data;
        }
    };
    

    $scope.setCategories=function(){
      $scope.categories = [];
      for(var i in $scope.tags){
        var post = $scope.tags[i];
        for(var j in post.tags){
          $scope.categories.push(post.tags[j]);
        }
      }

    };

   

     

       
    

   
});
