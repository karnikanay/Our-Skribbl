const express = require('express');
const app = express();
const port = 3000;
const socketio = require('socket.io');
const Constants = require('../shared/constants');
const Room = require('./room.js');

app.use(express.static('dist'));

const server = app.listen(port, () => {
  console.log('Listening on port: ' + port);
});

const io = socketio(server);

let rooms = {};

io.on(Constants.MSG_TYPES.CONNECT, (socket) => {
  console.log(socket.id + " connected");
  // Handle socket callbacks
  socket.on(Constants.MSG_TYPES.FILL_COLOR, (data) => {
    io.emit(Constants.MSG_TYPES.FILL_COLOR, data);
  });
  
  socket.on(Constants.MSG_TYPES.JOIN_ROOM, (roomName) => {
    if(rooms[roomName]) {
      rooms[roomName].addPlayer(socket);
      socket.emit(Constants.MSG_TYPES.JOIN_SUCCESS);
    }
    else {
      // Error: no such room
      console.log(socket.id + " tried to join invalid room.");
      socket.emit(Constants.MSG_TYPES.JOIN_FAIL);
    }
  });

  socket.on(Constants.MSG_TYPES.CREATE_ROOM, (roomName) => {
    if(rooms[roomName]) {
      // Error: room already exists
      socket.emit(Constants.MSG_TYPES.CREATE_FAIL);
    }
    else {
      rooms[roomName] = new Room();
      rooms[roomName].addPlayer(socket);
      socket.emit(Constants.MSG_TYPES.CREATE_SUCCESS);
    }
  });

  socket.on(Constants.MSG_TYPES.CLEAR_CANVAS, () => {
    io.emit(Constants.MSG_TYPES.CLEAR_CANVAS);
  });
  
  socket.on(Constants.MSG_TYPES.BRUSH_STROKE, (data) => {
    io.emit(Constants.MSG_TYPES.BRUSH_STROKE, data);
  });
});

