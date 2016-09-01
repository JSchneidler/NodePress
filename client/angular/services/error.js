angular.module('app').factory('Error', ['$rootScope', function($rootScope) {

	$rootScope.errors = [];

	function getAll() {
		return $rootScope.errors;
	}

	function add(type, error) {
		$rootScope.errors.push({
			type: type,
			error: error
		});
	}

	function remove(error) {
		$rootScope.errors.splice($rootScope.errors.indexOf(error), 1);
	}

	function clear() {
		$rootScope.errors = [];
	}

	return {
		getAll: getAll,
		add: add,
		remove: remove,
		clear: clear
	};
}]);