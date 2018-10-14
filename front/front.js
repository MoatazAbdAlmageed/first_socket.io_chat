var app = angular.module('chat', ['ysilvela.socket-io']);
app.run(function ($rootScope, mySocket) {
    $rootScope.isLoged = false;
});

app.factory('mySocket', function (socketFactory) {
    return socketFactory();
});