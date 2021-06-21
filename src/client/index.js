import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'
import { startCapturingInput, stopCapturingInput } from './input'
import { connect, joinRoom, createRoom } from './networking'
import React from "react"
import ReactDOM from "react-dom"
import Leaderboard from './leaderboard.js'

function initColors() {
  var colorPalette = document.getElementById('colorPalette');
  colorPalette.style.width = (40*(COLOR_PALETTE.length/2 + COLOR_PALETTE.length%2) + 10) + "px";

  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var newColor = document.createElement("div");
    newColor.setAttribute("class", "color");
    newColor.setAttribute("color-id", id);
    newColor.style.backgroundColor = COLOR_PALETTE[id];
    colorPalette.appendChild(newColor);
  }
}

function initBrushes() {
  var brushesSmall = document.getElementById('brushes-small');
  var brushesLarge = document.getElementById('brushes-large');

  var smallCount = 0;
  var largeCount = 0;

  for(var id = 0; id < BRUSH_SIZES.length; id++) {
    var newBrush = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var containerSize = BRUSH_SIZES[id] < 16 ? 32 : 72;

    newBrush.setAttribute('width', containerSize);
    newBrush.setAttribute('height', containerSize);
    newBrush.setAttribute('brush-id', id);

    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', containerSize/2);
    circle.setAttribute('cy', containerSize/2);
    circle.setAttribute('r', BRUSH_SIZES[id]);
    circle.setAttribute('stroke-width', 0);
    circle.setAttribute('fill', 'black');

    newBrush.appendChild(circle);

    if(BRUSH_SIZES[id] < 16) {
      brushesSmall.appendChild(newBrush);
      smallCount++;
    }
    else {
      brushesLarge.appendChild(newBrush);
      largeCount++;
    }
  }

  brushesSmall.style.width = (38*(smallCount/2 + smallCount%2) + 5) + "px";
  brushesLarge.style.width = (80*(largeCount) + 5) + "px";
}

var leaderDiv = document.getElementById("leaderboard");

function toggleLeaderboard(toggleMode) {
  if(toggleMode)
    leaderDiv.style.visibility = "visible";
  else
    leaderDiv.style.visibility = "hidden";
}

document.getElementById("joinRoomBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  joinRoom(document.getElementById("roomName").value);
});

document.getElementById("createRoomBtn").addEventListener("click", (ev) => {
  ev.preventDefault();
  createRoom(document.getElementById("roomName").value);
});

ReactDOM.render(<Leaderboard />, leaderDiv);
toggleLeaderboard(0);

initColors();
initBrushes();

startCapturingInput();
connect();
