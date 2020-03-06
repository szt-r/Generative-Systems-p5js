const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];

function setup() {
  createCanvas(530, 530, SVG);

  PALETTE = [
    color(255, 52, 154), // pink
    color(4, 0, 152), // blue
  ];

  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(250);
  testLines();
}

function testLines() {
  let numberOfShapes = randomSelectTwo ? SIDES : SIDES * 2;
  
  const strokeColour = getRandomFromPalette();

  noFill(0);
  push();
  translate(width / 2, height / 2);
  stroke(PALETTE[0]);
  ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);

  stroke(strokeColour);
  const angle = 360 / numberOfShapes;
  for (let i = 0; i < numberOfShapes; i++) {
    line(0, 0, 0, CRYSTAL_SIZE / 2);
    rotate(angle);
  }
  pop();
}

function randomSelectTwo() {
  const randomNum = random(1); // between 0 and 1
  return randomNum > 0.5 ? true : false;
}

function getRandomFromPalette() {
  const randomColour = floor(random(0, PALETTE.length));
  return PALETTE[randomColour];
}