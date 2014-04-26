angular.module('users-index', []).

config(function($stateProvider) {
  $stateProvider.state( 'users-index', {
    
    resolve:{
      users:  function(getAllUsers){
            // $http returns a promise for the url data
            //return $http({method: 'GET', url: '/posts'});
            return getAllUsers.init();
         }
      },

    url: '/users',
    views: {
      "main": {
        controller: 'UsersIndexCtrl',
        templateUrl: 'users/index/users-index.tpl.html'
      }
    },
    data:{ pageTitle: 'All Users'}
   
   
  });
})

.controller('UsersIndexCtrl',function($scope, $http, users){
    $scope.users=users.data;
  
});
