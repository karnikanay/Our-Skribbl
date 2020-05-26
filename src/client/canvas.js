import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'

// Get DOM elements
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

initCanvas();

export function initCanvas(){
  ctx.width = canvas.width;
  ctx.height = canvas.height;
  ctx.lineCap = "round";
}

export function emptyScreen(){
	ctx.fillStyle = COLOR_PALETTE[0];
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var count = 0;
var stack = [];
export function fillColor(pos, color) {
  var imgData = ctx.getImageData(0, 0, ctx.width, ctx.height);
  var data = imgData.data

  //do a DFS and go to all points which are neighbouring
  console.log(getXY(pos.x, pos.y) + ':' +data[getXY(pos.x, pos.y) + 0]);
  var curColor =  data[getXY(pos.x, pos.y) + 0]*0x010000 |
                  data[getXY(pos.x, pos.y) + 1]*0x000100 |
                  data[getXY(pos.x, pos.y) + 2]*0x000001 ;  

  console.log('CUR COLOR: ' + curColor);
  var tarColor = "0x" + (COLOR_PALETTE[color].slice(1, 7));
  tarColor = +tarColor;
  console.log('TAR COLOR: ' + tarColor)

  stack.push({x : pos.x, y : pos.y});
  while(stack.length > 0){
    var last = stack.pop();
    var x = last.x;
    var y = last.y;
  
    var dx = [1, 0, -1, 0];
    var dy = [0, 1, 0, -1];
    for(var i = 0; i < 4; i++){
      var xx = x + dx[i];
      var yy = y + dy[i];
      if(xx < 0 || xx >= ctx.width || yy < 0 || yy >= ctx.height)
        continue

      if( data[getXY(xx, yy) + 3] == 0 ||(
          data[getXY(xx, yy) + 0] == (curColor&(0xFF0000)>>16) && 
          data[getXY(xx, yy) + 1] == (curColor&(0x00FF00)>>8) && 
          data[getXY(xx, yy) + 2] == (curColor&(0x0000FF))) ){
        
          data[getXY(xx, yy) + 2] = (tarColor&(0x0000FF));
          data[getXY(xx, yy) + 1] = (tarColor&(0x00FF00))>>8;
          data[getXY(xx, yy) + 0] = (tarColor&(0xFF0000))>>16; 
          data[getXY(xx, yy) + 3] = 255;
          stack.push({x : xx, y : yy});
      }

    }  
  }
  ctx.putImageData(imgData, 0, 0);
  count = 0;
}

function getXY(x, y){
  return (y*ctx.width + x)*4;
}

function dfs(x, y, tarColor, curColor, img){
  //mark cur as the same color
  //console.log('DFS: ' + x + ', ' + y + ': ' + tarColor);
  
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

