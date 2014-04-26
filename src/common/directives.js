angular.module('app.directives', [])

.directive('flashFade', function($timeout){
	return function(scope, element, attrs){
		scope.$watch('flash.message', function(){
			if(element.is(":visible")){
                   $timeout(function(){
                        scope.$apply(scope.hideFlash()); 
                   }, 3500);
                   


					/*element.fadeOut(3500).delay(100, function(){
               
                     element.removeAttr('style');
                     scope.$apply(scope.hideFlash()); 
                    });*/
                     

			}
		});
	};
})


.directive('sidebar', function() {
  return {
    link: function($scope) {
      
    },
    templateUrl: 'site/site-sidebar/site-sidebar.tpl.html',
    scope: true,
    restrict: 'E'
  };
});

/*.directive('ngFocus', function($parse) {
    return function(scope, element, attr) {
        var fn = $parse(attr['ngFocus']);
        element.bind('focus', function(event) {
            scope.$apply(function() {
                fn(scope, {$event:event});
            });
        });
    };
});*/
