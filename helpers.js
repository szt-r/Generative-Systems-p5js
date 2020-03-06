// HELPER FUNCTIONS
function randomSelectTwo() {
  const randomNum = random(1); // between 0 and 1
  return randomNum > 0.5 ? true : false;
}

function getRandomFromPalette() {
  const randomColour = floor(random(0, PALETTE.length));
  return PALETTE[randomColour];
}

function pointOnCircle(posX, posY, radius, angle) {
  const x = posX + radius * cos(angle);
  const y = posX + radius * sin(angle);
  return createVector(x, y);
}

function hexagon(posX, posY, radius) {
  const rotAngle = 360 / 6;
  beginShape();
  for (let i = 0; i < 6; i++) {
    const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle);
    vertex(thisVertex.x, thisVertex.y);
  }
  endShape(CLOSE);
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