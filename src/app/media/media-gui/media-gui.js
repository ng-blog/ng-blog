angular.module('media-gui', []).

config(function config($stateProvider) {
  $stateProvider.state( 'media-gui', {
    
    resolve:{
      media:function(getMedia){
        return getMedia.init();
      }
    },

    url: '/media',
    views: {
      "main": {
        controller: 'MediaGuiCtrl',
        templateUrl: 'media/media-gui/media-gui.tpl.html'
      }
    },
    data:{ pageTitle: 'Media Library'}
   
   
  });
})

.controller('MediaGuiCtrl',function($scope, $http, $location, media){

      $('#uploadIframe').load(function(){
        var $this = $(this);
        console.log($this.get(0).contentWindow.location.pathname);

       });

      $scope.media=media.data;




});
	