var app = angular.module('chat', ['ysilvela.socket-io', ]);
app.run(function ($rootScope,mySocket) {
  $rootScope.users = [];
  $rootScope.isLoged = false;


  mySocket.on('user joined', (data) => {
    console.log(data)
    $rootScope.users.push(data.username);
    // log(data.username + ' joined');
    // addParticipantsMessage(data);
  });


});

app.factory('mySocket', function (socketFactory) {
  return socketFactory();
});