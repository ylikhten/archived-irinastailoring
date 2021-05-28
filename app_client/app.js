angular.module('irinasTailoring', ['ngRoute']);

function config($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'home/home.view.html',
		controller: 'homeCtrl'
	}).otherwise({redirectTo: '/'});
}

angular.module('irinasTailoring').config(['$routeProvider', config]);
