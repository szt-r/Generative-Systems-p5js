class Layer {
  constructor() {
    this.sides = SIDES;
    this.numOfShapes = this.sides;
    this.angle = 360 / this.numOfShapes;
    this.stepsOut = 8;
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.strokeColour = getRandomFromPalette();
  }
}

class Circles extends Layer {
  constructor() {
    super();
    this.shapeSize = (CRYSTAL_SIZE / 2) * 0.93;
    this.position = (CRYSTAL_SIZE / 2) - (this.shapeSize / 2); // position = outer shape radius - inner shape radius
  }

  render() {
    noFill();
    stroke(this.strokeColour);
    strokeWeight(1);
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < this.numOfShapes; i++) {
      ellipse(this.position, 0, this.shapeSize, this.shapeSize);
      rotate(this.angle);
    }
    pop();
  }
}