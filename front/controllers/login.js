app.controller('login', function (mySocket, $scope, $rootScope, $window) {
    $scope.login = function () {
        if ($scope.username) {
            mySocket.emit('user join', $scope.username);
            $rootScope.currentUser = $scope.username; // (you)
            $rootScope.isloggedin = true;
            // $rootScope.users.push($scope.username);
        }
    }
});