angular.module('app').factory('Auth', ['$resource', function($resource) {
	return $resource('/api/auth/:id', { id: '@id' }, {
		login: { method: 'POST', url: '/api/login' },
		register: { method: 'POST', url: '/api/register' },
		verify: { method: 'GET' },
		getIP: { method: 'GET', url: '/api/ip' },
		update: { method: 'PUT' }
	});
}]);