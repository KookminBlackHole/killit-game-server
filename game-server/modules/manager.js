var GameManager = require("./manager/game_manager");
var MatchmakingManager = require("./manager/matchmaking_manager");

var Manager = function () {
  var manager = {};
  manager.game = new GameManager();
  manager.matchmaking = new MatchmakingManager(manager.game);

  return manager
}

module.exports = Manager;