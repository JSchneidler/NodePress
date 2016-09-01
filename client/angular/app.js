var app = angular.module('app', [
	'ui.router',
	'ngResource',
	'angular-jwt',
	'ui.tinymce'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'jwtInterceptorProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/404');

	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 'angular/views/index.html'
		})
		.state('login', {
      url: '/login',
      templateUrl: 'angular/views/login.html',
      controller: 'AuthCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'angular/views/register.html',
      controller: 'AuthCtrl'
    })
    .state('user', {
      url: '/user/:username',
      templateUrl: 'angular/views/user.html',
      controller: 'ProfileCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'angular/views/404.html'
    });

	//JWT config
  jwtInterceptorProvider.tokenGetter = function() {
      if (storageAvailable('localStorage')) {
          return localStorage.getItem('jwt');
      }
      return;
  };

  $httpProvider.interceptors.push('jwtInterceptor');

}]);