app.controller('chat', function (mySocket, $scope, $rootScope) {
    $scope.messages = [];

    mySocket.on('new message', function (data) {
        // add you 
        var name = data.username;
        if ($rootScope.currentUser == data.username) {
            name = name + ' (You)'
        }
        $scope.messages.push(name + ': ' + data.message)
    });


    $scope.sendMessage = function (e) {
        mySocket.emit('new message', $scope.msg, function (callback) {
            console.log("callback")
            console.log(callback)
            $scope.msg = '';
        });




        e.preventDefault()

    };
});