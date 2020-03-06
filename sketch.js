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
    
  const layer = new Circles();
  console.log(layer);
  layer.render();
  
  // testLines();
  // outlineShape();
  // simpleLines();
  // circles();
  
//   let picker = random(1);
//   if (picker > 0.3) {
//     outlineShape();
//   }
  
//   picker = random(1);
//   if (picker > 0.3) {
//     simpleLines();
//   }
  
//   picker = random(1);
//   if (picker > 0.3) {
//     circles();
//   }
}

function simpleLines() {
  const stepsOut = 8;
  const numSteps = randomSelectTwo() ? stepsOut : int(stepsOut * 1.25);
  const step = (CRYSTAL_SIZE / 2) / numSteps; // (radius / number of steps)
  const start = floor(random(0, numSteps));
  const stop = floor(random(start, numSteps + 1));
  
  const numberOfShapes = randomSelectTwo() ? SIDES : SIDES * 2;
  const strokeColour = getRandomFromPalette();
  const weight = randomSelectTwo() ? 1 : 3;
  const angle = 360 / numberOfShapes;

  noFill();
  stroke(strokeColour);
  strokeWeight(weight);
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < numberOfShapes; i++) {
    line(start * step, 0, stop * step, 0);
    rotate(angle);
  }
  pop();
}

function outlineShape() {
  const strokeColour = getRandomFromPalette();
  const weight = randomSelectTwo() ? 1 : 3;
  const hexagonTrue = randomSelectTwo();

  stroke(strokeColour);
  strokeWeight(weight);
  push();
  translate(width / 2, height / 2);
  if (hexagonTrue) {
    hexagon(0, 0, CRYSTAL_SIZE / 2);
  } else {
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
  }
  pop();
}

function testLines() {
  let numberOfShapes = randomSelectTwo() ? SIDES : SIDES * 2;

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