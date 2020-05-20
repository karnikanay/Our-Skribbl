import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'

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

function handleColorChange() {
  drawColor = this;
}

function handleBrushChange() {
  brushSize = this;
}

function switchToBrush() {
  brushOn();
  bucketOff();
  brushMode = 1;
}

function switchToEraser() {
  brushOn();
  bucketOff();
  brushMode = 0;
}

function switchToBucket() {
  brushOff();
  bucketOn();
}

function clearScreen() {
  console.log('cleared the canvas');
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

export function stopCapturingOutput() {
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
}

export function brushOn() {
  window.addEventListener('mousedown', brushDown);
  window.addEventListener('mouseup', brushUp);
  canvas.addEventListener('mousemove', brushMove);
}

export function brushOff() {
  window.removeEventListener('mousedown', brushDown);
  window.removeEventListener('mouseup', brushUp);
  canvas.removeEventListener('mousemove', brushMove);
}

export function bucketOn() {
  canvas.addEventListener('click', bucketClick);
}

export function bucketOff() {
  canvas.removeEventListener('click', bucketClick);
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

