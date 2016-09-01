angular.module('app').filter('capitalize', function() {
	return function(input) {
		if (!angular.isString(input) || !angular.isString(input.charAt(0))) {
			return input;
		}
		return input.charAt(0).toUpperCase() + input.slice(1);
	};
});