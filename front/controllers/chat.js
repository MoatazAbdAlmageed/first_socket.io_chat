app.controller('chat', function (mySocket, $scope, $rootScope) {
    $scope.messages = [];
    $scope.logs = [];
    $scope.typist = {};
    $scope.isCurrentUser = function (username) {
        return $rootScope.currentUser == username
    }


    /*################ new message ################### */
    mySocket.on('new message', function (data) {

        $rootScope.typing = false;

        if (data.message) {
            $scope.messages.push(data.message)
        }
        if (data.onlineUsers) {
            $scope.users = data.onlineUsers
        }
    });

    /*################ sendMessage ################### */
    mySocket.on('sendMessage', function (data) {

        $rootScope.typing = false;

        var name = data.username;
        if (name == $rootScope.currentUser) {
            name = ' (You)'
        }
        if (data.message) {
            $scope.messages.push(name + ": " + data.message )
        }
        if (data.onlineUsers) {
            $scope.users = data.onlineUsers
        }
    });

    /*################ user left ################### */
    mySocket.on('user left', function (data) {
        if (data.message) {
            $scope.messages.push(data.message)
        }
        if (data.onlineUsers) {
            $scope.users = data.onlineUsers
        }
    });


    /*################ user join ################### */
    mySocket.on('user join', function (data) {

        if (data.message) {
            $scope.messages.push(data.message)
        }
        if (data.onlineUsers) {
            $scope.users = data.onlineUsers
        }
    });

/* todo */
    $scope.typing = function (e) {
        if ($scope.msg) {
            mySocket.emit('typing', $scope.msg);
        }
    };


    /*################ typing ################### */
    /* todo */
    mySocket.on('typing', (data) => {
        $scope.logs.push(data.username + ' Typing');

    });


    $scope.sendMessage = function (e) {
        mySocket.emit('sendMessage', $scope.msg);
        delete  $scope.msg; // to empty input
        e.preventDefault()

    };

});