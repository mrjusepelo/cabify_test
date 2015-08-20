var Public = {
	initialize: function(){
		var module = angular.module("Cabify", [ "sales_module"]);




		$(document).on('ready page:load', function(arguments) {
			angular.bootstrap(document.body, ['Cabify'])
		});

	} //close initialize


}
