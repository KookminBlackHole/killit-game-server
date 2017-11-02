var app = require('express')();
var http = require('http').Server(app);
var socketIO = require('socket.io');
var io = socketIO.listen(http);
var uuidv4 = require('uuid/v4');
var Manager = require('./modules/manager');

// Instance of manager
var manager = new Manager();

// Real-time client count
var client_count = 0;

// Route for root
app.get('/', function(req, res){
  res.send('<h1>Killit Game Server</h1><h2>Now ' + client_count + ' clients online</h2>');
});

// On connection
io.sockets.on('connection', function (socket) {
  // When client disconnect
  socket.on('disconnect', function () {
    client_count--;

    // Send dequeue signal to matchmaking manager
    if (manager.matchmaking.dequeue(socket.id)) return;

    // If don't, in-game client may be disconnected
    manager.game.playerDisconnect(socket.id);
  });

  // Emit 'connected' to specific socket
  socket.emit('lobby:connected', socket.id);

  // Increase client count
  client_count++;

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