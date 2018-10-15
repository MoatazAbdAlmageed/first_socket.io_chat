var app = angular.module('chat', ['ysilvela.socket-io']);
app.run(function ($rootScope,mySocket) {
    $rootScope.isLoged = false;
    $rootScope.currentUser = "Guest";
    $rootScope.logs = [];

    mySocket.on('before login', function (data) {
        if (data.log) {
            $rootScope.logs .push(data.log);
        }
    });

});

app.factory('mySocket', function (socketFactory) {
    return socketFactory();
});