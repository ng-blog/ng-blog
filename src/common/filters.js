angular.module('app.filters',[])

.filter('teaser', function(){
	return function(html){
		html = $.parseHTML(html);
		var $div = $("<div />");
		$div.append(html);
		var $p = $div.find('p');
		
		var text=$p.text();
		text=text.slice(0,255)+" ...";
		return text;
	};
});
