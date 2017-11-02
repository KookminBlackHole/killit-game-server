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
      player.print();
      
      this.queue.push(player);
      this.checkMatch();
    }
  
    manager.dequeue = function (id) {
      var isInQueue = false;
      this.queue.forEach(function (value, index, array) {
        if (value.id == socket.id) {
          delete this.queue[index];
          isInQueue = true;
        }
      });
  
      return isInQueue;
    }
  
    manager.checkMatch = function() {
      if (this.queue.length >= 2) {
        GameManager.makeGame(this.queue[0], this.queue[1]);
        this.queue = [];
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