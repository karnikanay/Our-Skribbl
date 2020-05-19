import { COLOR_PALETTE, BRUSH_SIZES } from '../shared/constants'
import { startCapturingInput, brushOn, brushOff, bucketOn, bucketOff } from './input'

function initColors() {
  var colorPalette = document.getElementById('colorPalette');
  colorPalette.style.width = (38*(COLOR_PALETTE.length/2 + COLOR_PALETTE.length%2) + 10) + "px";

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

  for(var id = 0; id < BRUSH_SIZES.length; id++) {
    var newBrush = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var containerSize = BRUSH_SIZES[id] < 16 ? 32 : 64;

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
    }
    else {
      brushesLarge.appendChild(newBrush);
    }
  }
}

initColors();
initBrushes();

bucketOn();
startCapturingInput();
