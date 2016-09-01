angular.module('app').factory('Comment', ['$resource', function($resource) {
	return $resource('/api/post/:pid/comment/:cid', { pid: '@pid', cid: '@cid' }, {
		query: { isArray: false },
	});
}]);