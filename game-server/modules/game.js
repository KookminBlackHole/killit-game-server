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
  // Start the game
  game.start = function () {
    // SAMPLE CODE: Send initial position to each player
    this.p1.setPosition(2, 2);
    this.p1.setDirection(0, 0);
    this.p1.setSpeed(0);
    this.p1.setAngle(0);
    
    this.p2.setPosition(2, 4);
    this.p2.setDirection(0, 0);
    this.p2.setSpeed(0);
    this.p2.setAngle(0);

    // Tell client that game is starting and initial position
    this.p1.socket.emit("game:start", {
      uuid: this.uuid,
      x: this.p1.x,
      y: this.p1.y,
      otherX: this.p2.x,
      otherY: this.p2.y
    });
    this.p2.socket.emit("game:start", {
      uuid: this.uuid,
      x: this.p2.x,
      y: this.p2.y,
      otherX: this.p1.x,
      otherY: this.p1.y
    });
  }

  // Find appropriate player instance by ID
  game.findPlayerById = function (id) {
    if (this.p1.id == id) return this.p1;
    else if (this.p2.id == id) return this.p2;
    else return false;
  }

  // Find appropriate opponent player instance by ID
  game.findOpponentById = function (id) {
    if (this.p1.id == id) return this.p2;
    else if (this.p2.id == id) return this.p1;
    else return false;
  }

  // Make game over cause by player disconnection
  game.overCauseByDisconnect = function (player) {
    console.log("[+] Game " + this.uuid + " was over caused by player disconnection");
    
    if (this.p1.id == player.id) {
      this.p2.socket.emit("game:over", {
        "code": 1, "cause": "Player disconnect"
      });
    } else {
      this.p1.socket.emit("game:over", {
        "code": 1, "cause": "Player disconnect"
      });
    }

    this.state = State.game.STATE_GAME_OVER;
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