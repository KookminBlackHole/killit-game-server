var Game = require('../game');
var uuidv4 = require('uuid/v4');

var GameManager = function (uuid, p1, p2) {
  var instance;

  function init() {
    var manager = {};
    
    manager.games = {};
  
    manager.makeGame = function (p1, p2) {
      // Generate id by UUIDv4
      var id = uuidv4();
      var game = new Game(id, p1, p2);
      manager.games[id] = game;
      game.print();
  
      // Tell client that game is starting
      game.p1.socket.emit("game:start", game.uuid);
      game.p2.socket.emit("game:start", game.uuid);
      console.log(manager.games);
    };
  
    manager.playerDisconnect = function (p1, p2) {
      // Check game instances, if exist over that game for player disconnection
      Object.keys(manager.games).forEach(function (value, index, array) {
        if (manager.games[value].p1.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p1);
          delete manager.games[index];
          return;
        }
  
        if (manager.games[value].p2.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p2);
          delete manager.games[index];
          return;
        }
      });
    }

    return manager;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
}

module.exports = GameManager();