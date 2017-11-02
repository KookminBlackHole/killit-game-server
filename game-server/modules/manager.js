var GameManager = require("./manager/game_manager");
var MatchmakingManager = require("./manager/matchmaking_manager");

var Manager = function () {
  var manager = {};
  manager.matchmaking = new MatchmakingManager(new GameManager());
  manager.game = manager.matchmaking.gameManager;

  return manager;
}

module.exports = Manager;