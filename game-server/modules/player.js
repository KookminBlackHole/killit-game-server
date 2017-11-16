var State = require("./state");

var Player = function (socket) {
  var player = {};
  
  // Name for this player
  player.name = undefined;
  // Socket instance
  player.socket = socket;
  // Player id based on socket id
  player.id = socket.id;
  // Current state for this player
  player.state = State.player.STATE_UNDEFINED;
  // Player coordination on map
  player.x = 0;
  player.y = 0;
  // Player direction on map
  player.dirX = 0;
  player.dirY = 0;
  // Player speed
  player.speed = 0;
  // Player angle
  player.angle = 0;

  /* Functions */
  // Set player's name.
  player.setName = function (name) {
    this.name = name;
  };

  // Set player's position.
  player.setPosition = function (x, y) {
    this.x = x;
    this.y = y;
  };

  // Set player's direction.
  player.setDirection = function (dirX, dirY) {
    this.dirX = dirX;
    this.dirY = dirY;
  };

  // Set player's view speed.
  player.setSpeed = function (speed) {
    this.speed = speed;
  };

  // Set player's view angle.
  player.setAngle = function (angle) {
    this.angle = angle;
  }

  // Send log to output channel.
  player.print = function () {
    console.log("[+] Player " + this.name + ":");
    console.log("\t- ID: " + this.id);
    console.log("\t- State: " + this.state);
    console.log("\t- X: " + this.x);
    console.log("\t- Y: " + this.y);
    console.log("\t- Direction(X): " + this.dirX);
    console.log("\t- Direction(Y): " + this.dirY);
    console.log("\t- Speed: " + this.speed);
    console.log("\t- Angle: " + this.angle);
  }

  return player;
}

module.exports = Player;