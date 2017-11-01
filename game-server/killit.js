var app = require('express')();
var http = require('http').Server(app);
var socketIO = require('socket.io');
var io = socketIO.listen(http);
var uuidv4 = require('uuid/v4');
var Manager = require('./modules/manager');

// Instance of manager
var manager = new Manager();

// Route for root
app.get('/', function(req, res){
  res.send('<h1>Killit Game Server</h1>');
});

// On connection
io.sockets.on('connection', function (socket) {
    // Emit 'connected' to specific socket
    socket.emit('lobby:connected', socket.id);

    // When client disconnect
    socket.on('disconnect', function () {
      // Send dequeue signal to matchmaking manager
      if (manager.matchmaking.dequeue(socket.id)) return;

      // If don't, in-game client may be disconnected
      manager.game.playerDisconnect(socket.id);
    });

    // When client ready
    socket.on('lobby:player-ready', function (data) {
      // Push to the matchmaking queue
      manager.matchmaking.enqueue(socket, data);
    });
});

// Turn on the server on port 8080
http.listen(8080, function(){
  console.log("[+] Killit Game Server");
  console.log("[+] Now listening on 0.0.0.0:8080");
});