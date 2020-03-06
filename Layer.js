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

class SimpleLines extends Layer {
  constructor() {
    super();
    this.numOfSteps = randomSelectTwo() ? this.stepsOut : int(this.stepsOut * 1.25);
    this.numOfShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.step = (CRYSTAL_SIZE / 2) / this.numOfSteps; // (radius / number of steps)
    this.start = floor(random(0, this.numOfSteps));
    this.stop = floor(random(this.start, this.numOfSteps + 1));
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.angle = 360 / this.numOfShapes;
  }

  render() {
    noFill();
    stroke(this.strokeColour);
    strokeWeight(this.weight);
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < this.numOfShapes; i++) {
      line(this.start * this.step, 0, this.stop * this.step, 0);
      rotate(this.angle);
    }
    pop();
  }
}

class OutlineShape extends Layer {
  constructor() {
    super();
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    this.hexagonTrue = randomSelectTwo();
  }

  render() {
    stroke(this.strokeColour);
    strokeWeight(this.weight);
    push();
    translate(width / 2, height / 2);
    if (this.hexagonTrue) {
      hexagon(0, 0, CRYSTAL_SIZE / 2);
    } else {
      ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
    }
    pop();
  }
}