var PlayerState = {
  STATE_UNDEFINED: "Undefined State",
  STATE_IDLE: "Idle",
  STATE_PLAYER_READY: "Player Ready",
  STATE_IN_GAME: "In Game"
};

var Player = function (socket) {
  var player = {};
  player.name = undefined;
  player.socket = socket;
  player.id = socket.id;
  player.state = PlayerState.STATE_UNDEFINED;
  player.x = 0;
  player.y = 0;
  player.dirX = 0;
  player.dirY = 0;
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

  // Set player's view angle.
  player.setAngle = function (angle) {
    this.angle = angle;
  };

  // Send log to output channel.
  player.print = function () {
    console.log("[+] Player " + this.name + ":");
    console.log("\t- ID: " + this.id);
    console.log("\t- State: " + this.state);
    console.log("\t- X: " + this.x);
    console.log("\t- Y: " + this.y);
    console.log("\t- Direction(X): " + this.dirX);
    console.log("\t- Direction(Y): " + this.dirY);
    console.log("\t- Angle: " + this.angle);
  }

  return player;
}

module.exports = Player;