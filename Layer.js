class Layer {
  constructor() {
    this.sides = SIDES;
    this.numOfShapes = this.sides;
    this.angle = 360 / this.numOfShapes;
    this.stepsOut = 8;
    this.singleStep = (CRYSTAL_SIZE / 2) / this.stepsOut;
    this.thinStroke = 1;
    this.thickStroke = 3;
    this.layerColour = getRandomFromPalette();
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
    stroke(this.layerColour);
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
    stroke(this.layerColour);
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
    stroke(this.layerColour);
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

class DottedLines extends Layer {
  constructor() {
    super();
    this.numOfShapes = randomSelectTwo() ? this.sides : this.sides * 2;
    this.angle = 360 / this.numOfShapes;
    this.shapeSize = 3;
    this.centerOffset = this.singleStep;
  }

  render() {
    fill(this.layerColour);
    noStroke();
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i <= this.numOfShapes; i++) {
      for (let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
        rect(x, 0, this.shapeSize, this.shapeSize);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class CenteredShapes extends Layer {
  constructor() {
    super();
    this.randomShape = random(1)
    this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut)) * this.singleStep;
  }

  render() {
    fill(this.layerColour);
    noStroke();
    push();
    translate(width / 2, height / 2);
    if (this.randomShape < 0.1) {
      rect(0, 0, this.shapeSize * 2, this.shapeSize * 2);
    } else if (this.randomShape >= 0.1 && this.randomShape < 0.6) {
      ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2);
    } else if (this.randomShape >= 0.6) {
      rotate(this.angle / 2);
      hexagon(0, 0, this.shapeSize);
    }
    pop();
  }
}

class RingOfShapes extends Layer {
  constructor() {
    super();
    this.steps = floor(random(1, this.stepsOut));
    this.center = this.steps * this.singleStep;
    this.randomShape = random(1);
    this.direction = randomSelectTwo(); // used for triangle only
    this.fillColour = randomSelectTwo() ? this.layerColour : color(0, 1);
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;

    if (this.steps < this.stepsOut / 2) {
      this.radius = floor(random(1, this.steps)) * this.singleStep;
    } else if (this.steps > this.stepsOut / 2) {
      this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep;
    } else {
      this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep;
    }
  }

  render() {
    stroke(this.layerColour);
    fill(this.fillColour);
    strokeWeight(this.weight);
    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < this.numOfShapes; i++) {
      if (this.randomShape < 0.33) {
        ellipse(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
        rect(0, this.center, this.radius, this.radius);
      } else if (this.randomShape >= 0.66) {
        myTriangle(this.center, this.radius, this.direction);
      }
      rotate(this.angle);
    }
    pop();
  }
}

class SteppedHexagons extends Layer {
  constructor() {
    super();
    this.numOfSteps = randomSelectTwo() ? this.stepsOut : this.stepsOut * 1.25;
    this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15;
    this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numOfSteps;
    this.weight = randomSelectTwo() ? this.thinStroke : this.thickStroke;
    // console.log('numOfSteps', this.numOfSteps);
    // console.log('centerOffset' ,this.centerOffset);
    // console.log('singleStep', this.singleStep);
  }

  render() {
    stroke(this.layerColour);
    noFill();
    strokeWeight(this.weight);
    push();
    translate(width / 2, height / 2);
    rotate(this.angle / 2);
    for (let i = 1; i <= this.numOfSteps; i++) {
      hexagon(0, 0, this.centerOffset + (i * this.singleStep));
    }
    pop();
  }
}