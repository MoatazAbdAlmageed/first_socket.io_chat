app.controller('login', function (mySocket,$scope, $rootScope,$window) {
    $scope.login = function () {
        if ( $scope.username)  {
        mySocket.emit('add user', $scope.username);
        $rootScope.currentUser = $scope.username; // (you)
        $rootScope.isLoged = true;
        $rootScope.users.push($scope.username);
    }
    }
});