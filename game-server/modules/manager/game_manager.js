var Game = require('../game');

var GameManager = function (uuid, p1, p2) {
  var manager = {};

  manager.games = {};

  manager.makeGame = function (p1, p2) {
    // Generate id by UUIDv4
    var id = uuidv4();
    var game = new Game(id, p1, p2);
    this.games[id] = game;
    game.print();

    // Tell client that game is starting
    game.p1.socket.emit("game:start", game.uuid);
    game.p2.socket.emit("game:start", game.uuid);
    console.log(this.games);
  };

  manager.playerDisconnect = function (p1, p2) {
    // Check game instances, if exist over that game for player disconnection
    Object.keys(this.games).forEach(function (value, index, array) {
      if (this.games[value].p1.id == socket.id) {
        this.games[value].overCauseByDisconnect(this.games[value].p1);
        delete this.games[index];
        return;
      }

      if (this.games[value].p2.id == socket.id) {
        this.games[value].overCauseByDisconnect(this.games[value].p2);
        delete this.games[index];
        return;
      }
    });
  }

  return manager;
}

module.exports = GameManager;