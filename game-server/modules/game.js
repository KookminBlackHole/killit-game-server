var GameState = {
  STATE_UNDEFINED: "Undefined",
  STATE_GAME_ESTABLISHED: "Established",
  STATE_IN_PROGRESS: "In Progress",
  STATE_GAME_OVER: "Game Over"
};

var Game = function (uuid, p1, p2) {
  var game = {};

  // UUID for this game
  game.uuid = uuid;

  // State for this game
  game.state = GameState.STATE_UNDEFINED;

  // Socket instances for players
  game.p1 = p1;
  game.p2 = p2;


  /* Functions */
  // Make game over cause by player disconnection
  game.overCauseByDisconnect = function (player) {
    // disconnection algorithm...
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