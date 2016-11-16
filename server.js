var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var connectionCounter = 0;

io.on('connection', function(socket) {
  console.log('Client connected');
  connectionCounter++;
  socket.emit('updatecounter', connectionCounter);
  socket.broadcast.emit('updatecounter', connectionCounter);
  socket.broadcast.emit('message', 'new client connected');

  socket.on('disconnect', function() {
    socket.broadcast.emit('message', 'client disconnected');
    connectionCounter--;
    socket.broadcast.emit('updatecounter', connectionCounter);
  });
  socket.on('message', function(message) {
    console.log('Received message:', message);
    socket.broadcast.emit('message', message);
  });

  socket.on('showtyping', function(isTyping) {
    socket.broadcast.emit('showtyping', isTyping);
  });

});

server.listen(process.env.PORT || 8080);

/* First you require the Socket.IO module. Then you wrap the Express app in a node http.server object. This allows Socket.IO to run alongside Express. You then initiaze an io object, by passing the server into the socket.io function. this creates a socket.io server, which is an EventEmitter. Next, you add a listener to the connection event of the server. This will be called whenever a client connects to the socket.io server. Finally, notice that you now call server.listen rather than app.listen. */
