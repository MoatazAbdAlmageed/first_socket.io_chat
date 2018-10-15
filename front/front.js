var app = angular.module('chat', ['ysilvela.socket-io']);
app.run(function ($rootScope) {
    $rootScope.isLoged = false;
    $rootScope.currentUser = "Guest";
});

app.factory('mySocket', function (socketFactory) {
    return socketFactory();
});