var State = require("./state");

var Game = function (uuid, p1, p2) {
  var game = {};

  // UUID for this game
  game.uuid = uuid;

  // State for this game
  game.state = State.game.STATE_UNDEFINED;

  // Socket instances for players
  game.p1 = p1;
  game.p2 = p2;

  /* Functions */
  // Make game over cause by player disconnection
  game.overCauseByDisconnect = function (player) {
    if (this.p1.id == player.id) {
      this.p2.socket.emit("game:over", {
        "code": 1, "cause": "Player disconnect"
      });
    } else {
      this.p1.socket.emit("game:over", {
        "code": 1, "cause": "Player disconnect"
      });
    }

    this.state = GameState.STATE_GAME_OVER;
  }

  // Send log to output channel. 
  game.print = function () {
    console.log("[+] Game details");
    console.log("\t- UUID: " + game.uuid);
    console.log("\t- State: " + p1.state);
    console.log("\t- Player 1: " + p1.name);
    console.log("\t- Player 2: " + p2.name);
  }

  return game;
}

module.exports = Game;