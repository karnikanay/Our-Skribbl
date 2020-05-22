// Get DOM elements
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
initCanvas();

export function initCanvas(){
	ctx.width = 500;
	ctx.height = 500;
}

export function emptyScreen(){
	ctx.fillStyle = "#FFFF0F";
	console.log(ctx.width + " " + ctx.height);
	ctx.fillRect(0, 0, ctx.width-1, ctx.height-1);
}

export function fillColor() {

}

export function strokeStart(){

}

export function strokeEnd(){
	ctx.beginPath();
}


export function brushStroke(pos, brushRadius, color) {
	//ctx.color = color;
	ctx.lineCap = "round";

	ctx.lineTo(pos.x, pos.y);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
}

