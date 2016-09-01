angular.module('app').controller('AuthCtrl', ['$scope', '$rootScope', '$location', 'TokenHelper', 'Error', 'Auth', function($scope, $rootScope, $location, TokenHelper, Error, Auth) {

  $scope.loginOrRegister = function(username, password, type) {
    var error_type = type.charAt(0).toUpperCase() + type.slice(1);

    function onSuccess(res) {
      if (!res.success) {
        Error.add(error_type, res.message);
      } else {
        localStorage.setItem('jwt', res.data);
        $rootScope.user = TokenHelper.pullUserFromToken(localStorage.getItem('jwt'));
        $location.path('/');
      }
    }

    function onError(err) {
      Error.add(error_type, err);
    }

    if (storageAvailable('localStorage')) {
      var credentials = {
        username: username,
        password: password
      };
      switch (type) {
        case 'login':
          Auth.login(credentials, onSuccess, onError);
          break;
        case 'register':
          Auth.register(credentials, onSuccess, onError);
          break;
      }
    } else {
      Error.add("Client", "Local storage not available! You will not be able to login.");
    }
  }

}]);