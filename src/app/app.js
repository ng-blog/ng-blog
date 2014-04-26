


// Declare app level module which depends on filters, and services
angular.module('app', [
	//'ngAnimate',
	'ui.router',
	'ui.bootstrap',
	'app.directives',
	'app.filters',
	'app.services',
	'app.posts',
	'app.users',
	'app.site',
	'app.media',
	'templates-app',
	'templates-common',
	'ngSanitize'

	
	])
.config(function($urlRouterProvider, $locationProvider, $provide){
	/*---HTML5 Hashbang Mode---*/
	$provide.decorator('$sniffer', function($delegate) {
		$delegate.history = false;
		return $delegate;
	});
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

	//If there is no route redirect to /home..
	$urlRouterProvider.otherwise("/home");

})

.controller('AppCtrl', function($scope, $rootScope, $location, getMenuItems, getSettings, getBlogPosts, getMe, stopScroll){
	$rootScope.hideHeadFoot=false;
	$rootScope.isLoggedIn=false;
	$rootScope.flash = {};
	$rootScope.flash.message=false;
	$rootScope.flash.type="";
	$rootScope.isCollapsed=true;

	$rootScope.$on('$stateChangeSuccess', function(event, toState, ToParams, fromState, fromParams){
		//on every few refreshes the page is scrolling down amount of padding on body...very weird
		//hackyfix...
		stopScroll.init();
		
		if (angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = toState.data.pageTitle;
		}

	});


	$scope.navClick=function(){
		
		if($(document).width() < 768){
			$rootScope.isCollapsed = !$rootScope.isCollapsed;	
		}
		
	};

	$scope.hideFlash=function(){
		$rootScope.flash.message=false;
	};

	$rootScope.notAuthorized=function(){
		$location.path('/home');
		$rootScope.flash.message="Not Authorized to View this Page";
		$rootScope.flash.type="danger";
	};

		//check if user is logged in and populate user and loggedin vars...
		getMe.init().then(function(data){
			console.log(data);
			if(data.status!==204){
				$rootScope.isLoggedIn=true;
				$rootScope.user=data.data;	
			}
		});


           //grab all menu items
           getMenuItems.init().then(function(data){
			$rootScope.menu_items=data.data;
           });
            //grab all site settings
            getSettings.init().then(function(settings){
				$rootScope.settings=settings.data[0];
            });

           //getAllPosts
           getBlogPosts.init().then(function(posts){
			$rootScope.blogPosts = posts.data;
           });

           
	/*if($location.protocol() !== 'https' && $location.protocol() !== 'file' && $location.host() !== 'localhost' && $location.host() !== '54.225.75.209'){
      $window.location.href = 'https:' + '//' + $location.host() + '/#' + $location.url();
  }*/

})
;
