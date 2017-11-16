var Game = require('../game');
var uuidv4 = require('uuid/v4');
var State = require("../state");

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

      // Start the game
      game.start();

      // Tell manager to add this game on array
      manager.games[id] = game;
      console.log("[+] Now " + Object.keys(manager.games).length + " games are in progress");
    };
    
    manager.playerDirectionUpdate = function (socket, data) {
      // data key: uuid, x, y, dirX, dirY, speed
      data = JSON.parse(data);
      var game = manager.games[data.uuid];
      if (game != undefined) {
        var player = game.findPlayerById(socket.id);
        var opponent = game.findOpponentById(socket.id);
        
        player.setPosition(data.x, data.y);
        player.setDirection(data.dirX, data.dirY);
        player.setSpeed(data.speed);
        opponent.socket.emit("game:feed-player-direction", data);
      } else {
        console.log("[+] Previous movement was canceled due to game over");
      }
    }

    manager.playerAngleUpdate = function (socket, data) {
      // data key: uuid, angle
      data = JSON.parse(data);
      var game = manager.games[data.uuid];
      if (game != undefined) {
        var player = game.findPlayerById(socket.id);
        var opponent = game.findOpponentById(socket.id);
        
        player.setAngle(data.angle);
        opponent.socket.emit("game:feed-player-angle", data);
      } else {
        console.log("[+] Previous movement was canceled due to game over");
      }
    }
  
    manager.playerDisconnect = function (socket) {
      // Check game instances, if exist over that game for player disconnection
      Object.keys(manager.games).forEach(function (value, index, array) {
        if (manager.games[value].p1.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p1);
          delete manager.games[value];
          return;
        }
  
        if (manager.games[value].p2.id == socket.id) {
          manager.games[value].overCauseByDisconnect(manager.games[value].p2);
          delete manager.games[value];
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