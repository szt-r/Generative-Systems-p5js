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
  const randomSides = random(1);
  let numberOfShapes;
  if (randomSides > 0.5) {
    numberOfShapes = SIDES;
  } else {
    numberOfShapes = SIDES * 2;
  }
  // console.log(randomSides, numberOfShapes);

  const randomColour = floor(random(0, PALETTE.length));
  const strokeColour = PALETTE[randomColour];
  // console.log(randomColour);

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