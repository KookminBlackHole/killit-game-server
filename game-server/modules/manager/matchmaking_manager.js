var Player = require('../player');

var MatchmakingManager = function (gameManager) {
  var manager = {};

  manager.queue = [];
  manager.gameManager = gameManager;

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
      this.gameManager.makeGame(queue[0], queue[1]);
      this.queue = [];
    }
  }

  return manager;
}

module.exports = MatchmakingManager;