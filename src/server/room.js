const Constants = require('../shared/constants');

class Room {
  constructor() {
    this.players = {};
  }

  // Runs callback on all players excluding player with SocketID exSocketId
  forPlayersExcluding(exSocketId, callback) {
    for(let curSocketId in this.players) {
      if(curSocketId != exSocketId) {
        callback(this.players[curSocketId]);
      }
    }
  }

  addPlayer(socket) {
    this.players[socket.id] = {};
    this.players[socket.id].socket = socket;

    socket.on(Constants.MSG_TYPES.FILL_COLOR, (data) => {
      this.forPlayersExcluding(socket.id, curPlayer => {
        curPlayer.socket.emit(Constants.MSG_TYPES.FILL_COLOR, data);
      });
    });

    socket.on(Constants.MSG_TYPES.CLEAR_CANVAS, () => {
      this.forPlayersExcluding(socket.id, curPlayer => {
        curPlayer.socket.emit(Constants.MSG_TYPES.CLEAR_CANVAS);
      });
    });

    socket.on(Constants.MSG_TYPES.BRUSH_STROKE, (data) => {
      this.forPlayersExcluding(socket.id, curPlayer => {
        curPlayer.socket.emit(Constants.MSG_TYPES.BRUSH_STROKE, data);
      });
    });
  }
}

module.exports = Room;
