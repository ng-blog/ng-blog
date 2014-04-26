angular.module('site-admin', []).

config(function config($stateProvider) {
  $stateProvider.state( 'site-admin', {
    

    url: '/site/admin',
    views: {
      "main": {
        controller: 'SiteAdminCtrl',
        templateUrl: 'site/site-admin/site-admin.tpl.html'
      }
    },
    data:{ pageTitle: 'Admin - Settings'}
   
   
  });
})

.controller('SiteAdminCtrl',function($scope, $http, $location, $rootScope, $timeout, getMe){
    
        getMe.init().then(function(user){
          if(user.data.role!=='admin'){
            $scope.notAuthorized();
          }
        });
        
    
   


    $scope.saveSettings=function(){
      
      
      var data={
        'siteName':$scope.settings.siteName, 
        'footer':$scope.settings.footer, 
        'sidebar':$scope.settings.sidebar

      };
      var str;
      if(typeof($scope.settings.id)==="string"){
        
        //edit
       str="/site?id="+$scope.settings.id;
      }else{
        //create
        str="/site";
      }

      
      $http.post(str, data)
      .success(function(result){
        $rootScope.flash.message="Site Settings Successfully Saved";
        $rootScope.flash.type="success";
        $location.path('/site/admin');
        
        
      }).error(function(err){
        $rootScope.flash.type="danger";
        $rootScope.flash.message=err.message;
        
      });


      
    };
   


});
