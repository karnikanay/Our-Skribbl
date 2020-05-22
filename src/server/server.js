const express = require('express');
const app = express();
const port = 3000;
const socketio = require('socket.io');
const Constants = require('../shared/constants');

app.use(express.static('dist'));

const server = app.listen(port, () => {
  console.log('Listening on port: ' + port);
});

const io = socketio(server);

io.on(Constants.MSG_TYPES.CONNECT, (socket) => {
  console.log(socket.id + " connected");
  // Handle socket callbacks
  socket.on(Constants.MSG_TYPES.FILL_COLOR, (data) => {
    io.emit(Constants.MSG_TYPES.FILL_COLOR, data);
  });
  
  socket.on(Constants.MSG_TYPES.CLEAR_CANVAS, () => {
    io.emit(Constants.MSG_TYPES.CLEAR_CANVAS);
  });
  
  socket.on(Constants.MSG_TYPES.BRUSH_STROKE, (data) => {
    io.emit(Constants.MSG_TYPES.BRUSH_STROKE, data);
  });
});

