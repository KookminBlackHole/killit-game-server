function UserData(gx, gy) {
  this.x = 0;
  this.y = 0;
  this.dirX = 0;
  this.dirY = 0;
  this.gx = gx;
  this.gy = gy;
  this.angle = 0;
}

function print(id, text) {
  console.log('[' + id + '] ' + text);
}

objects = [];

server = require('http').Server();
var socketIO = require('socket.io');
var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {
  var timerId = null;

  print(socket.id, 'connect');
  socket.emit('connected', '');

  socket.on('disconnect', function() {
      print(socket.id, 'disconnect');

      clearInterval(timerId);
      delete objects[socket.id];
  });

  socket.on('player-ready', function(data) {
      objects[socket.id] = new UserData(2, 2);

      if (Object.keys(objects).length > 1) {
          print('system', 'all ready');
          io.sockets.emit('start', { x: objects[socket.id].gx, y: objects[socket.id].gy });
      }
  });

  socket.on('start', function(data) {
      socket.broadcast.emit('create-this-player', { id: socket.id, x: objects[socket.id].gx, y: objects[socket.id].gy, angle: objects[socket.id].angle });

      timerId = setInterval(function() {
          socket.broadcast.emit('other-player', { id: socket.id, x: objects[socket.id].x, y: objects[socket.id].y, dirX: objects[socket.id].dirX, dirY: objects[socket.id].dirY, angle: objects[socket.id].angle });
      }, 16);
  });

  socket.on('player-position', function(data) {
      data = eval(data)[0];
      objects[socket.id].x = data.x;
      objects[socket.id].y = data.y;
      objects[socket.id].dirX = data.dirX;
      objects[socket.id].dirY = data.dirY;
      objects[socket.id].angle = data.angle;
  });
});
server.listen(8080);