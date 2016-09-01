angular.module('app').factory('User', ['$resource', function($resource) {
	return $resource('/api/user/:username', { username: '@username' }, {
		query: { isArray: false },
		getPosts: { method: 'GET', url: '/api/user/:userid/posts', params: { userid: '@userid' } },
		getComments: { method: 'GET', url: '/api/user/:userid/comments', params: { userid: '@userid' } }
	});
}]);