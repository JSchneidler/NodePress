angular.module('app').controller('MainCtrl', ['$scope', '$rootScope', '$sce', '$location', 'TokenHelper', 'Error', 'Auth', function($scope, $rootScope, $sce, $location, TokenHelper, Error, Auth) {

	// Trust binded HTML
	$scope.trust = $sce.trustAsHtml;

	$scope.loadUser = function() {
		// Pull and regenerate user from token if it can
		Auth.getIP(function(res) {
			if (!res.success) return Error.add('Server', 'Server error. Please contact webmaster to resolve');
			$rootScope.ip = res.data;
		});
		if (storageAvailable('localStorage')) {
			var token = localStorage.getItem('jwt');
			if (token) {
				$rootScope.user = TokenHelper.pullUserFromToken(token);
				if (!TokenHelper.isTokenExpired(token)) {
					Auth.verify(function(res) {
						if (!res.success) {
							$rootScope.user = null;
							localStorage.removeItem('jwt');
							return Error.add('Authentication', 'Error authenticating. Please login again.');
						}
						localStorage.setItem('jwt', res.data);
						$rootScope.user = TokenHelper.pullUserFromToken(localStorage.getItem('jwt'));
					}, function(err) {
						if (err) return Error.add('Server', 'Server error. Please contact webmaster to resolve.');
					});
				} else {
					$rootScope.user = null;
					localStorage.removeItem('jwt');
				}
			}
		} else {
			Error.add('Client', 'Local storage not available! You will not be able to login or register.');
		}
	}

	$scope.loadUser();

	// User/Auth stuff
	$scope.isUser = function() {
		if ($rootScope.user) return true;
		return false;
	}

	$scope.userIsModerator = function() {
		if ($rootScope.user && $rootScope.user.moderator === true) return true;
		return false;
	}

	$scope.userIsAdmin = function() {
		if ($rootScope.user && $rootScope.user.admin === true) return true;
		return false;
	}

	$scope.getUserRole = function(user) {
		if (user.admin) return 'Admin';
		if (user.moderator) return 'Moderator';
		return 'User';
	}

	$scope.logout = function() {
		localStorage.removeItem('jwt');
		$rootScope.user = null;
		$location.path('/');
	}

	// Errors
	$scope.haveErrors = function() {
		if (Error.getAll().length > 0) return true;
		return false;
	}

	$scope.removeError = function(error) {
		Error.remove(error);
	}

	$scope.clearErrors = function() {
		Error.clear();
	}

	// Date/time functions
	$scope.formatDate = function(date) {
		var options = {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}
		return new Date(+date).toLocaleTimeString('en-us', options);
	}

	$scope.momentCalendarDate = function(date) {
		return moment(new Date(+date)).calendar();
	}

}]);