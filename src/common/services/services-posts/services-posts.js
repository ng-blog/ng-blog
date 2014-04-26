angular.module('services-posts',[])

.service('getBlogPosts',function($http, dbPath){

	this.init=function(){
		return $http.get(dbPath.path+'/posts?type=blog');
	};
	
})


.service('getPosts',function($http, dbPath){
	this.init=function(){return $http.get(dbPath.path+'/posts');};
})

.service('postsByTag',function($http, dbPath){
	this.init=function(tag){return $http.get(dbPath.path+'/posts?tags='+tag);};
})



.service('getSinglePost', function($http, dbPath){
	this.init = function(slug){
		var json = {'slug': slug};
		var url ='/posts?slug='+slug;
		return $http.get(dbPath.path+url);
	};
})

.service('getHomePage', function($http, dbPath){
	this.init = function(){
		var url ='/posts?isHome='+'true';
		return $http.get(dbPath.path+url);
	};

});