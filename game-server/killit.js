var app = require('express')();
var http = require('http').Server(app);
var socketIO = require('socket.io');
var io = socketIO.listen(http);
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
  console.log("[+] " + socket.id + ": Welcome to new player!");
  // When client disconnect
  socket.on('disconnect', function () {
    client_count--;

    // Send dequeue signal to matchmaking manager
    if (manager.matchmaking.dequeue(socket.id)) return;

    // If don't, in-game client may be disconnected
    manager.game.playerDisconnect(socket);
  });

  // Emit 'connected' to specific socket
  socket.emit('lobby:connected', socket.id);
  console.log("[+] " + socket.id + ": lobby-connected send");

  // Increase client count
  client_count++;

  // When client ready
  socket.on('lobby:player-ready', function (data) {
    console.log("[+] " + socket.id + ": player-ready received");
    // Push to the matchmaking queue
    manager.matchmaking.enqueue(socket, data);
  });

  // When player position changed
  socket.on('game:update-player-direction', function (data) {
    manager.game.playerDirectionUpdate(socket, data);
  });

  // When player angle changed
  socket.on('game:update-player-angle', function (data) {
    manager.game.playerAngleUpdate(socket, data);
  })
});

// Turn on the server on port 8080
http.listen(8080, function(){
  console.log("[+] Killit Game Server");
  console.log("[+] Now listening on 0.0.0.0:8080");
});