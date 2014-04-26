angular.module('app.services',['services-users', 'services-posts'])

.service('dbPath', function($location){
	if($location.$$host==='localhost'){
		this.path= $location.$$protocol+'://'+$location.$$host+':'+$location.$$port;	
	}else{
		this.path=$location.$$protocol+'://'+$location.$$host;
	}
	
	
})

.service('getSettings',function($http, $rootScope){
	this.init=function(){
		return $http.get('/site');
	};
})

.service('getMenuItems',function($http, dbPath){
	this.init=function(){return $http.get(dbPath.path+'/posts?{"isMenuItem":true,"$fields":{"slug":1,"title":1}}');
	};
})


.service('menuOrderList', function(){
	return function(){
		var arr=[];
		for(var i=-10; i<11; i++){
			var idx=i;
			arr.push({"value":i, "name":i});
		}
		return arr;
	};

})

.service('stopScroll', function($window){
	this.init=function(){
		$(window).scroll(function(){
			$window.scrollTo(0,0);
			$(window).off('scroll');
		});
	};
})

.service('getMedia', function($http, dbPath){
	this.init=function(){
		return $http.get(dbPath.path+'/media');
	};
})
;

