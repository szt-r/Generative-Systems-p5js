const CRYSTAL_SIZE = 150;
const SIDES = 6;

// layout
const MARGIN = CRYSTAL_SIZE / 3;
const COLUMNS = 3;
const ROWS = 4;
const PADDING = CRYSTAL_SIZE * 0.2;
const GRIDBOX = CRYSTAL_SIZE + PADDING;
const START = CRYSTAL_SIZE / 2 + MARGIN;

let PALETTE = [];
let ALL_CRYSTALS = [];

function setup() {
  const totalX = START + GRIDBOX * COLUMNS;
  const totalY = START + GRIDBOX * ROWS;
  createCanvas(totalX, totalY, SVG);

  PALETTE = [
    color(255, 52, 154), // pink
    color(4, 0, 152), // blue
  ];

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(255);

  // go to a point on the screen and draw a crystal
  // continue to do this until we run out of room
  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const posX = START + x * GRIDBOX;
      const posY = START + y * GRIDBOX;
      ALL_CRYSTALS.push(new Crystal(posX, posY));
    }
  }

  ALL_CRYSTALS.forEach(crystal => crystal.render());
}