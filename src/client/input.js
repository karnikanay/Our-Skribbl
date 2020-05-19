import { COLOR_PALETTE } from '../shared/constants'

var canvas = document.getElementById('board');
var isDrawing = false;
var curTool, drawColor, brushSize;
var curPos = { x: 0, y: 0 };
var lastPos = curPos;

export function startCapturingInput() {
  // Add event listener for each color
  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var color = document.querySelector(`[color-id="${id}"]`);
    color.addEventListener('click', function() {
      drawColor = this;
    }.bind(id));
  }
}

export function stopCapturingOutput() {
  // Remove event listener for each color
  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var color = document.querySelector(`[color-id="${id}"]`);
    color.removeEventListener('click');
  }
}

export function brushOn() {
  window.addEventListener('mousedown', brushDown);
  window.addEventListener('mouseup', brushUp);
  canvas.addEventListener('mousemove', brushMove);
}

export function brushOff() {
  window.removeEventListener('mousedown');
  window.removeEventListener('mouseup');
  canvas.removeEventListener('mousemove');
}

export function bucketOn() {
  canvas.addEventListener('click', bucketClick);
}

export function bucketOff() {
  canvas.removeEventListener('click');
}

function brushDown() {
  isDrawing = true;
  lastPos = curPos;
}

function brushUp() {
  isDrawing = false;
}

function updatePos(e) {
  var offset = canvas.getBoundingClientRect();

  lastPos = curPos;
  curPos.x = e.clientX - Math.round(offset.x);
  curPos.y = e.clientY - Math.round(offset.y);
}

function brushMove(e) {
  if(isDrawing) {
    updatePos(e);
    console.log('made a stroke from x: ' + lastPos.x + ', y: ' + lastPos.y + ' to x: ' + curPos.x + ', y: ' + curPos.y);
  }
}

function bucketClick(e) {
  updatePos(e);
  console.log('fill color at x: ' + curPos.x + ', y: ' + curPos.y);
}

