var GameManager = require("./manager/game_manager");
var MatchmakingManager = require("./manager/matchmaking_manager");

var Manager = function () {
  var manager = {};
  manager.game = GameManager.getInstance();
  manager.matchmaking = MatchmakingManager.getInstance();
  
  return manager;
}

module.exports = Manager;