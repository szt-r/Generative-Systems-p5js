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

function myTriangle(center, radius, direction) {
  if (direction) {
    beginShape();
    vertex(center + radius * cos(0), radius * sin(0));
    vertex(center + radius * cos(120), radius * sin(120));
    vertex(center + radius * cos(240), radius * sin(240));
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(center + radius * cos(180), radius * sin(180));
    vertex(center + radius * cos(300), radius * sin(300));
    vertex(center + radius * cos(60), radius * sin(60));
    endShape(CLOSE);
  }
}

const layerConstructors = [
  {
    name: 'Outline Shape',
    weight: 0.3,
    init: () => new OutlineShape()
  },
  {
    name: 'Centered Shape',
    weight: 0.3,
    init: () => new CenteredShape()
  },
  {
    name: 'Circles',
    weight: 0.3,
    init: () => new Circles()
  },
  {
    name: 'Simple Lines',
    weight: 0.3,
    init: () => new SimpleLines()
  },
  {
    name: 'Dotted Lines',
    weight: 0.3,
    init: () => new DottedLines()
  },
  {
    name: 'Ring of Shapes',
    weight: 0.3,
    init: () => new RingOfShapes()
  },
  {
    name: 'Stepped Hexagons',
    weight: 0.7,
    init: () => new SteppedHexagons()
  },
  {
    name: 'Test Lines',
    weight: 1,
    init: () => new TestLines()
  },
]