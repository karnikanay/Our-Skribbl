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
  socket.on(Constants.MSG_TYPES.JOIN_ROOM, (roomName) => {
    if(socket.currentRoom) {
      // Error: player already in a room
      socket.emit(Constants.MSG_TYPES.JOIN_FAIL, "Can't join room. Already in a room.");
    }
    else if(rooms[roomName]) {
      rooms[roomName].addPlayer(socket);
      socket.currentRoom = roomName;
      socket.emit(Constants.MSG_TYPES.JOIN_SUCCESS, "Room joined successfully.");
    }
    else {
      // Error: no such room
      console.log(socket.id + " tried to join invalid room.");
      socket.emit(Constants.MSG_TYPES.JOIN_FAIL, "Room not found in the server.");
    }
  });

  socket.on(Constants.MSG_TYPES.CREATE_ROOM, (roomName) => {
    if(socket.currentRoom) {
      // Error: player already in a room
      socket.emit(Constants.MSG_TYPES.CREATE_FAIL, "Can't create room. Already in a room.");
    }
    else if(rooms[roomName]) {
      // Error: room already exists
      socket.emit(Constants.MSG_TYPES.CREATE_FAIL, "Can't create room. Room already exists.);
    }
    else {
      rooms[roomName] = new Room();
      rooms[roomName].addPlayer(socket);
      socket.currentRoom = roomName;
      socket.emit(Constants.MSG_TYPES.CREATE_SUCCESS, "Successfully created room.");
    }
  });
});

