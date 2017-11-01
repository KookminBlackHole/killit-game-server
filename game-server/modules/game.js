var Game = function (uuid, p1, p2) {
  var game = {};

  // UUID for this game
  game.uuid = uuid;

  // Socket instances for players
  game.p1 = p1;
  game.p2 = p2;

  /* Functions */
  // Make game over by disconnect.
  game.overCauseByDisconnect = function (player) {
    
  }

  // Send log to output channel.
  game.print = function () {
    console.log("[+] Game details");
    console.log("\t- UUID: " + game.uuid);
    console.log("\t- Player 1: " + p1.name);
    console.log("\t- Player 2: " + p2.name);
  }

  return game;
}

module.exports = Game;