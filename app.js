angular.module('bakpak',['ngRoute'])

.config(function($routeProvider){
	$routeProvider
	.when('/test',{
		templateUrl: 'view.html',
		controller: 'viewController'
	})
	.otherwise({
	   redirectTo: '/'
	});
})