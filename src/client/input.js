import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'
import {brushStroke, emptyScreen, fillColor} from './canvas'
import { sendBrushStroke, sendFill, sendClear } from './networking'

var canvas = document.getElementById('board');
var isDrawing = false;
var curTool, drawColor, brushSize;
var brushMode;
var curPos = { x: 0, y: 0 };
var lastPos = curPos;

var fillTool = document.getElementById('fill-tool');
var brushTool = document.getElementById('brush-tool');
var clearTool = document.getElementById('clear-tool');
var eraserTool = document.getElementById('eraser-tool');

var disableCurrentTool = function() { };

function getColorBox(id) {
  return document.querySelector(`[color-id="${id}"]`);
}

function getBrushBox(id) {
  return document.querySelector(`[brush-id="${id}"]`);
}

function handleColorChange() {
  if(drawColor != undefined) {
    getColorBox(drawColor).classList.remove("selected");
  }

  drawColor = this;

  getColorBox(drawColor).classList.add("selected");
}

function handleBrushChange() {
  if(brushSize != undefined) {
    getBrushBox(brushSize).classList.remove("selected");
  }

  brushSize = this;

  getBrushBox(brushSize).classList.add("selected");
}

function switchToBrush() {
  disableCurrentTool();
  brushTool.classList.add("selected");

  brushOn();
  bucketOff();
  brushMode = 1;

  disableCurrentTool = function() {
    brushTool.classList.remove("selected");
  }
}

function switchToEraser() {
  disableCurrentTool();
  eraserTool.classList.add("selected");

  brushOn();
  bucketOff();
  brushMode = 0;

  disableCurrentTool = function() {
    eraserTool.classList.remove("selected");
  }
}

function switchToBucket() {
  disableCurrentTool();
  fillTool.classList.add("selected");

  brushOff();
  bucketOn();

  disableCurrentTool = function() {
    fillTool.classList.remove("selected");
  }
}

function clearScreen() {
  console.log('cleared the canvas');
  emptyScreen();
  sendClear();
}

export function startCapturingInput() {
  // Add event listener for each color
  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var color = document.querySelector(`[color-id="${id}"]`);
    color.addEventListener('click', handleColorChange.bind(id));
  }

  // Add event listener for each brush size
  for(var id = 0; id < BRUSH_SIZES.length; id++) {
    var brushSizeElem = document.querySelector(`[brush-id="${id}"]`);
    brushSizeElem.addEventListener('click', handleBrushChange.bind(id));
  }

  // Add event listeners for tools
  brushTool.addEventListener('click', switchToBrush);
  fillTool.addEventListener('click', switchToBucket);
  clearTool.addEventListener('click', clearScreen);
  eraserTool.addEventListener('click', switchToEraser);
}

export function stopCapturingInput() {
  // Remove event listener for each color
  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var color = document.querySelector(`[color-id="${id}"]`);
    color.removeEventListener('click', handleColorChange);
  }

  // Remove event listener for each brush size
  for(var id = 0; id < BRUSH_SIZES.length; id++) {
    var brushSizeElem = document.querySelector(`[brush-id="${id}"]`);
    brushSizeElem.removeEventListener('click', handleBrushChange);
  }

  // Remove event listeners for tools
  brushTool.removeEventListener('click', switchToBrush);
  eraserTool.removeEventListener('click', switchToEraser);
  clearTool.removeEventListener('click', clearScreen);
  fillTool.removeEventListener('click', switchToBucket);

  brushOff();
  bucketOff();
}

export function brushOn() {
  console.log("ENABLED BRUSH");
  window.addEventListener('mousedown', brushDown);
  window.addEventListener('mouseup', brushUp);
  window.addEventListener('mousemove', brushMove);

  window.addEventListener('touchstart', brushDown);
  window.addEventListener('touchend', brushUp);
  window.addEventListener('touchmove', brushMove);
}

export function brushOff() {
  console.log("DISABLED BRUSH");
  window.removeEventListener('mousedown', brushDown);
  window.removeEventListener('mouseup', brushUp);
  window.removeEventListener('mousemove', brushMove);

  window.removeEventListener('touchstart', brushDown);
  window.removeEventListener('touchend', brushUp);
  window.removeEventListener('touchmove', brushMove);
}

export function bucketOn() {
  window.addEventListener('click', bucketClick);
}

export function bucketOff() {
  window.removeEventListener('click', bucketClick);
}
  
function brushDown(e) {
  if(e.type == 'touchstart')
    e = e.touches[0];

  isDrawing = true;
  updatePos(e);
}

function brushUp() {
  isDrawing = false;
}

function updatePos(e) {
  var offset = canvas.getBoundingClientRect();

  lastPos = { x: curPos.x,
              y: curPos.y };
  curPos.x = e.clientX - Math.round(offset.x);
  curPos.y = e.clientY - Math.round(offset.y);
}

function brushMove(e) {
  e.preventDefault();
  
  if(e.type == 'touchmove')
    e = e.touches[0];

  if(isDrawing) {
    updatePos(e);
    console.log("brushMODe: " + brushMode);
    brushStroke(lastPos, curPos, brushSize, brushMode*drawColor);
    sendBrushStroke(lastPos, curPos, brushSize, brushMode*drawColor);
    console.log('made a stroke from x: ' + lastPos.x + ', y: ' + lastPos.y + ' to x: ' + curPos.x + ', y: ' + curPos.y);
  }
}

function bucketClick(e) {
  updatePos(e);
  sendFill(curPos, drawColor);
  fillColor(curPos, drawColor);
  console.log('fill color at x: ' + curPos.x + ', y: ' + curPos.y);
}

