angular.module('media-img', []).

config(function config($stateProvider) {
  $stateProvider.state( 'media-img', {
    

    url: '/media/images',
    views: {
      "main": {
        controller: 'MediaUploadCtrl',
        templateUrl: 'media/media-img/media-img.tpl.html'
      }
    },
    data:{ pageTitle: 'Media Library'}
   
   
  });
})

.controller('MediaUploadCtrl',function($scope, $http, $location, $rootScope){
  
  $rootScope.hideHeadFoot=true;

  $scope.$watch('image', function(newVal){
    if(typeof(newVal)!=='undefined'){
      $scope.imageName=newVal.replace(/C:\\fakepath\\/i, '');
    }
  });

  $scope.submitForm=function(){
    if(typeof($scope.imageName!=='undefined')){
      $("#imageUpload").attr('action', '/media/'+$scope.imageName+"?subdir=images").submit();

    }
  };





});
	