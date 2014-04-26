angular.module('posts-create', []).

config(function config($stateProvider) {
  $stateProvider.state( 'posts-create', {
    

    url: '/create-post',
    views: {
      "main": {
        controller: 'PostsCreateCtrl',
        templateUrl: 'posts/create/posts-create.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Post'}
   
   
  });
})

.controller('PostsCreateCtrl',function($scope, $http, $location, $rootScope, $timeout, dbPath, menuOrderList){
  $scope.title="";
  $scope.is_menu_item=false;
  $scope.isHome=false;
  
  $scope.$watch('title', function(){
    $scope.slug = $scope.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-\_ ]/g, '').toLowerCase();
    
    
  });
  $scope.tags="";
    $scope.createPost=function(){
      if($scope.tags!==""){
        
          $scope.tags = $scope.tags.split(",");    
        
        
      }else{
        $scope.tags=[];
      }
      
      var data={
        'title':$scope.title, 
        'body':$scope.body, 
        'slug':$scope.slug,
        'tags':$scope.tags,
        'type':$scope.post_type,
        'isHome':$scope.isHome

      };
      if($scope.is_menu_item){
        data.menu=$scope.menu_order;
        data.isMenuItem=true;
      }
      

      $http.post(dbPath.path+'/posts', data)
      .success(function(result){
        $rootScope.flash.message="Post Successfully Saved";
        $rootScope.flash.type="success";
        $location.path('#/posts/'+$scope.slug);
        
        if($scope.post_type==='page' && $scope.is_menu_item){
          $rootScope.menu_items.push({"title":$scope.title, "slug":$scope.slug});  
        }
        
        
      }).error(function(err){
        $rootScope.flash.type="danger";
        $rootScope.flash.message=err.message;
        
      });


      
    };
   
    $scope.addMenuItem=function(){
      $scope.is_menu_item = !$scope.is_menu_item;
    };
    $scope.makeHomePage=function(){
      $scope.isHome = !$scope.isHome;
      $scope.is_menu_item=false;
    };
    
  $scope.post_types=[{"value":"empty", "name":"- Select a Post Type - "}, {"value":"blog", "name":"Blog"}, {"value":"page", "name":"Page"}];
  $scope.post_type='empty';
  

  $scope.menu_order_list = menuOrderList();
  $scope.menu_order=0;


});
