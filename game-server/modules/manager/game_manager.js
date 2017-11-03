var Game = require('../game');
var uuidv4 = require('uuid/v4');
var State = require("./state");

var GameManager = function (uuid, p1, p2) {
  var instance;

  function init() {
    var manager = {};
    
    manager.games = {};
  
    manager.makeGame = function (p1, p2) {
      // Generate id by UUIDv4
      var id = uuidv4();
      var game = new Game(id, p1, p2);
      game.print();

      // State change for player and game
      game.state = State.game.STATE_GAME_ESTABLISHED;
      game.p1.state = State.player.STATE_IN_GAME;
      game.p2.state = State.player.STATE_IN_GAME;
  
      // Tell client that game is starting
      game.p1.socket.emit("game:start", game.uuid);
      game.p2.socket.emit("game:start", game.uuid);

      // Tell manager to add this game on array
      manager.games[id] = game;
      console.log(manager.games);
    };
  
    manager.playerDisconnect = function (socket) {
      // Check game instances, if exist over that game for player disconnection
      Object.keys(manager.games).forEach(function (value, index, array) {
        if (manager.games[value].p1.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p1);
          console.log("[+] Game " + manager.games[value].uuid + " was over caused by disconnection :")
          manager.games[value].p1.print();
          delete manager.games[index];
          return;
        }
  
        if (manager.games[value].p2.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p2);
          console.log("[+] Game " + manager.games[value].uuid + " was over caused by disconnection :")
          manager.games[value].p1.print();
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