angular.module('app').factory('TokenHelper', ['jwtHelper', function(jwtHelper) {

	function pullUserFromToken(token) {
		return jwtHelper.decodeToken(token);
	}

	function isTokenExpired(token) {
		var user = pullUserFromToken(token);
		var exp = +user.exp * 1000; //Convert from seconds to milliseconds
		if (Date.now() > exp) return true;
		return false;
	}

	return {
		pullUserFromToken: pullUserFromToken,
		isTokenExpired: isTokenExpired
	};
}]);