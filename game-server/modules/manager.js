var GameManager = require("./manager/game_manager");
var MatchmakingManager = require("./manager/matchmaking_manager");

var Manager = {
  game: new GameManager(),
  matchmaking: new MatchmakingManager(game)
}

module.exports = Manager;