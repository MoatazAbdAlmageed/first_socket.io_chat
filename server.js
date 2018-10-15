// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening at port %d', port);
});
// Routing
app.use(express.static(path.join(__dirname, 'front')));


// Chatroom

// var numUsers = 0;
var onlineUsers = [];

io.on('connection', (socket) => {

    console.log("connection Done with id=> ",socket.id);
    socket.emit('before login', {log: "Welcome from socket"});

    // when the client emits 'user join', this listens and executes
    socket.on('user join', (username) => {
        // we store the username in the socket session for this client
        socket.username = username;
        // ++numUsers;
        onlineUsers.push({id: socket.id, name: username});
        console.log(onlineUsers);
        // socket.emit('login', {
        //     numUsers: numUsers
        // });
        // echo globally (all clients) that a person has connected
        socket.emit('new message', {
            username: socket.username,
            // numUsers: numUsers,
            onlineUsers: onlineUsers
        });

        socket.broadcast.emit('new message', {
            message: socket.username + " Joined",
            onlineUsers: onlineUsers

        });
    });


    // when the client emits 'new message', this listens and executes
    socket.on('sendMessage', (data) => {
        console.log("sendMessage");
        // we tell the client to execute 'new message'
        io.sockets.emit('sendMessage', {
            username: socket.username,
            message: data
        });
    });


    // when the client emits 'user join', this listens and executes
    // socket.on('Joined', (username) => {
    //     io.emit('Joined', {
    //         username: username,
    //         id: socket.id,
    //     });
    //
    //
    //     // if (addedUser) return;
    //     //
    //     // // we store the username in the socket session for this client
    //     // socket.username = username;
    //     // ++numUsers;
    //     // addedUser = true;
    //     // socket.emit('login', {
    //     //     numUsers: numUsers
    //     // });
    //     // // echo globally (all clients) that a person has connected
    //     // socket.broadcast.emit('user joined', {
    //     //     username: socket.username,
    //     //     numUsers: numUsers
    //     // });
    // });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', (message) => {

        io.emit('typing', {
            username: socket.username,
            message: message,
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {


        for (var i = 0, len = onlineUsers.length; i < len; ++i) {
            var c = onlineUsers[i];

            if (c.id == socket.id) {
                onlineUsers.splice(i, 1);
                break;
            }
        }


        if (socket.username) {
            socket.broadcast.emit('new message', {
                message: socket.username + " Left",
                onlineUsers: onlineUsers

            });
        }


        socket.emit('new message', {
            onlineUsers: onlineUsers
        });


        // echo globally that this client has left
        // socket.broadcast.emit('user left', {
        //     username: socket.username,
        //     onlineUsers: onlineUsers
        // });


        // if (addedUser) {
        //     --numUsers;
        //
        //     // echo globally that this client has left
        //     socket.broadcast.emit('user left', {
        //         username: socket.username,
        //         numUsers: numUsers
        //     });
        // }
    });
});