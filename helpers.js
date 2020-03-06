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