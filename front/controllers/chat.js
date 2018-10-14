app.controller('chat', function (mySocket, $scope, $rootScope) {
    $scope.messages = [];
    $scope.logs = [];
    $scope.typist = {};
    $scope.isCurrentUser = function (username) {
        return $rootScope.currentUser == username
    }


    /*################ new message ################### */
    mySocket.on('new message', function (data) {
        debugger

        $rootScope.typing = false;

        if (data.message) {
            $scope.messages.push(data.message)
        }
        if (data.onlineUsers) {
            $scope.users = data.onlineUsers
        }
    });

    mySocket.on('sendMessage', function (data) {

        $rootScope.typing = false;

        var name = data.username;
        if (name == $rootScope.currentUser) {
            name += ' (Your)'
        }
        if (data.message) {
            $scope.messages.push(name + ': ' + data.message)
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


    /*################ typing ################### */
    mySocket.on('typing', (data) => {
        $scope.logs.push(data.username + ' Typing');

    });


    $scope.sendMessage = function (e) {
        // $scope.typing = false;
        mySocket.emit('sendMessage', $scope.msg);
        delete  $scope.msg;
        e.preventDefault()

    };
    $scope.typing = function (e) {
        if ($scope.msg) {
            mySocket.emit('typing', $scope.msg);
        }
    };
});