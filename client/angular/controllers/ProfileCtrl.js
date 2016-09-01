angular.module('app').controller('ProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'User', 'Post', 'Comment', 'Error', function($scope, $rootScope, $stateParams, User, Post, Comment, Error) {
  
  $scope.showUser = false;

  User.get({ username: $stateParams.username }, function(res) {
		if (!res.success) {
			return Error.add('Server', 'Could not fetch user');
		}

		if (isOwner(res.data)) {
	  	$scope.owner = true;
	  	$scope.user = $rootScope.user;
	  } else {
	  	$scope.user = res.data;
	  }

  	User.getPosts({ userid: $scope.user.id }, function(res) {
			if (!res.success) {
				return Error.add('Server', "Could not fetch user's posts");
			}
			console.log(res.data);
			$scope.user.posts = res.data;
		});

		User.getComments({ userid: $scope.user.id }, function(res) {
			if (!res.success) {
				return Error.add('Server', "Could not fetch user's comments");
			}
			console.log(res.data);
			$scope.user.comments = res.data;
		});

	  $scope.showUser = true;
	});

	$scope.excerpt = function(text) {
		if (text.length < 35) return text;
		return text.substring(0, 35);
	}

  function isOwner(user) {
  	if ($rootScope.user && user.id === $rootScope.user.id) return true;
  	return false;
  }

}]);