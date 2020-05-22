import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'

// Get DOM elements
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
initCanvas();

export function initCanvas(){
  ctx.lineCap = "round";
}

export function emptyScreen(){
	ctx.fillStyle = "#FFFF0F";
	console.log(ctx.width + " " + ctx.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function fillColor() {

}

export function brushStroke(pos1, pos2, brushRadius, color) {
  ctx.beginPath();
  ctx.strokeStyle = COLOR_PALETTE[color];
  ctx.lineWidth = 2*BRUSH_SIZES[brushRadius];
  ctx.moveTo(pos1.x, pos1.y);
  ctx.lineTo(pos2.x, pos2.y);
  ctx.stroke();
  ctx.closePath();
}

