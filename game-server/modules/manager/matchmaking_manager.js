var Player = require('../player');
var GameManager = require('./game_manager').getInstance();

var MatchmakingManager = function () {
  var instance;

  function init() {
    var manager = {};
    
    manager.queue = [];
  
    manager.enqueue = function (socket, data) {
      // Initialize player
      var player = new Player(socket);
      player.setName(JSON.parse(data).name);
      // player.setState(PlayerState.IDLE);
      player.print();
      
      manager.queue.push(player);
      manager.checkMatch();
    }
  
    manager.dequeue = function (id) {
      var isInQueue = false;
      manager.queue.forEach(function (value, index, array) {
        if (value.id == socket.id) {
          delete manager.queue[index];
          isInQueue = true;
        }
      });
  
      return isInQueue;
    }
  
    manager.checkMatch = function() {
      if (manager.queue.length >= 2) {
        GameManager.makeGame(manager.queue[0], manager.queue[1]);
        manager.queue = [];
      }
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

module.exports = MatchmakingManager();