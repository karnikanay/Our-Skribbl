import { COLOR_PALETTE } from '../shared/constants'

var colorPalette = document.getElementById('colorPalette');

function initColors() {
  colorPalette.style.width = (38*(COLOR_PALETTE.length/2 + COLOR_PALETTE.length%2) + 10) + "px";

  for(var id = 0; id < COLOR_PALETTE.length; id++) {
    var newColor = document.createElement("div");
    newColor.setAttribute("class", "color");
    newColor.setAttribute("id", "color" + id);
    newColor.style.backgroundColor = COLOR_PALETTE[id];
    colorPalette.appendChild(newColor);
  }
}

initColors();

