var app = require('express')();
var http = require('http').Server(app);
var socketIO = require('socket.io');
var io = socketIO.listen(http);
var uuidv4 = require('uuid/v4');
var Player = require('./modules/player');
var Game = require('./modules/game');

var matchmakingQueue = [];
var games = {};

// When Matchmaking succeed
var makeMatch = function (p1, p2) {
  var id = uuidv4();
  var game = new Game(id, p1, p2);
  games[id] = game;
  game.print();
  game.p1.socket.emit("game:start", game.uuid);
  game.p2.socket.emit("game:start", game.uuid);
  console.log(games);
}

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
      // ...
    });

    // When client ready
    socket.on('lobby:player-ready', function (data) {
      var player = new Player(socket);
      player.setName(JSON.parse(data).name);
      player.print();
      matchmakingQueue.push(player);

      if (matchmakingQueue.length == 2) {
        makeMatch(matchmakingQueue[0], matchmakingQueue[1]);
        matchmakingQueue = [];
      }
    });
});

http.listen(8080, function(){
  console.log("[+] Killit Game Server");
  console.log("[+] Now listening on 0.0.0.0:8080");
});