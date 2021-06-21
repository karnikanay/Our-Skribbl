class Room {
  let players = {};

  function addPlayer(socket) {
    players[socket.id].socket = socket;
  }
}

module.exports = Room;
