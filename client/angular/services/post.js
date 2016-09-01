angular.module('app').factory('Post', ['$resource', function($resource) {
	return $resource('/api/post/:id', { id: '@_id' }, {
		query: { isArray: false },
		update: { method: 'PUT' },
		upvote: { method: 'GET', url: '/api/posts/:id/upvote' }
	});
}]);