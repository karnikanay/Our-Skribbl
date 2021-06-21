module.exports = Object.freeze({
  MSG_TYPES: { 
    CONNECT: "connect",
    JOIN_ROOM: "join_room",
    JOIN_SUCCESS: "join_success",
    JOIN_FAIL: "join_fail",
    CREATE_ROOM: "create_room",
    CREATE_SUCCESS: "create_success",
    CREATE_FAIL: "create_fail",
    BRUSH_STROKE: "brush_stroke",
    CLEAR_CANVAS: "clear_canvas",
    FILL_COLOR: "fill_color",
    DISCONNECT: "disconnect" 
  },
 
  BRUSH_SIZES: [ 
    2,
    5,
    10,
    15,
    20,
    30 
  ],

  COLOR_PALETTE: [
    '#FFFFFF',
    '#C1C1C1', 
    '#EF130B', 
    '#FF7100', 
    '#FFE400', 
    '#00CC00', 
    '#00B2FF', 
    '#231FD3', 
    '#A300BA', 
    '#D37CAA', 
    '#A0522D',
    '#000000',
    '#4C4C4C', 
    '#740B07', 
    '#C23800', 
    '#E8A200', 
    '#005510', 
    '#00569E', 
    '#0E0865', 
    '#550069', 
    '#A75574', 
    '#63300D'
  ]
});
