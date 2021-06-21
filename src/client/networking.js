import io from 'socket.io-client'
import { MSG_TYPES } from '../shared/constants'
import { brushStroke, fillColor, emptyScreen } from './canvas'

const socket = io();

const connectionPromise = new Promise(function(resolve) {
  console.log("new promise here");
  socket.on(MSG_TYPES.CONNECT, () => {
    console.log("connected to server");
    resolve();
  });
});

export const connect = () => {
  connectionPromise.then(() => {
    // Handle socket callbacks
    socket.on(MSG_TYPES.JOIN_SUCCESS, handleJoinSuccess);
    socket.on(MSG_TYPES.JOIN_FAIL, handleJoinFail);
    socket.on(MSG_TYPES.CREATE_SUCCESS, handleCreateSuccess);
    socket.on(MSG_TYPES.CREATE_FAIL, handleCreateFail);
    socket.on(MSG_TYPES.BRUSH_STROKE, handleBrushStroke);
    socket.on(MSG_TYPES.FILL_COLOR, handleFillColor);
    socket.on(MSG_TYPES.CLEAR_CANVAS, handleClearCanvas);
    socket.on(MSG_TYPES.DISCONNECT, handleDisconnect);
  });
}

function handleBrushStroke(data) {
  brushStroke(data.pos1, data.pos2, data.brushRadius, data.color);
}

function handleFillColor(data) {
  fillColor(data.pos, data.color);
}

function handleClearCanvas() {
  emptyScreen();
}

function handleDisconnect() {
  console.log("disconnected from server");
}

function handleJoinFail() {
  document.getElementById("form-notif").innerHTML = "Room not found in server.";
}

function handleJoinSuccess() {
  document.getElementById("form-notif").innerHTML = "Room joined successfully";
}

function handleCreateFail() {
  document.getElementById("form-notif").innerHTML = "Room could not be created.";
}

function handleCreateSuccess() {
  document.getElementById("form-notif").innerHTML = "Room created successfully.";
}

export function sendBrushStroke(pos1, pos2, brushRadius, color) {
  socket.emit(MSG_TYPES.BRUSH_STROKE, 
             { pos1: pos1,
               pos2: pos2,
               brushRadius, brushRadius,
               color: color });
}

export function sendFill(pos, color) {
  socket.emit(MSG_TYPES.FILL_COLOR, 
             { pos: pos,
               color: color });
}

export function sendClear() {
  socket.emit(MSG_TYPES.CLEAR_CANVAS);
}

export function joinRoom(roomName) {
  socket.emit(MSG_TYPES.JOIN_ROOM, roomName);
}

export function createRoom(roomName) {
  socket.emit(MSG_TYPES.CREATE_ROOM, roomName);
}

