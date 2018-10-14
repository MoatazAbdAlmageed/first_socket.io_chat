app.controller('chat', function (mySocket, $scope, $rootScope) {
    $scope.messages = [];
    $scope.isCurrentUser = function (username) {
        return $rootScope.currentUser == username
    }
    mySocket.on('new message', function (data) {
        // add you
        var name = data.username;
        if ($scope.isCurrentUser(data.username)) {
            name += ' (You)'
        }
        $scope.messages.push(name + ': ' + data.message)
    });
    $scope.sendMessage = function (e) {
        mySocket.emit('new message', $scope.msg);
        delete  $scope.msg;
        e.preventDefault()

    };
});