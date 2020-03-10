const state = {
  sides: SIDES,
  stepsOut: 8,
  thinStroke: 1,
  thickStroke: 3,
}

const setState = (state) => {
  state.numOfShapes = state.sides;
  state.angle = 360 / state.numOfShapes;
  state.singleStep = (CRYSTAL_SIZE / 2) / state.stepsOut;
  state.layerColour = getRandomFromPalette();
  return state;
}

const circles = (state) => {
  state.shapeSize = (CRYSTAL_SIZE / 2) * 0.93;
  state.position = (CRYSTAL_SIZE / 2) - (state.shapeSize / 2); // position = outer shape radius - inner shape radius

  return ({
    name: 'Circles',
    render: () => {
      noFill();
      stroke(state.layerColour);
      strokeWeight(1);
      push();
      // translate(width / 2, height / 2);
      for (let i = 0; i < state.numOfShapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize);
        rotate(state.angle);
      }
      pop();
    }
  });
}

const simpleLines = (state) => {
  state.numOfSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25);
  state.numOfShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.step = (CRYSTAL_SIZE / 2) / state.numOfSteps; // (radius / number of steps)
  state.start = floor(random(0, state.numOfSteps));
  state.stop = floor(random(state.start, state.numOfSteps + 1));
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  state.angle = 360 / state.numOfShapes;

  return ({
    name: 'Simple Lines',
    render: () => {
      noFill();
      stroke(state.layerColour);
      strokeWeight(state.weight);
      push();
      // translate(width / 2, height / 2);
      for (let i = 0; i < state.numOfShapes; i++) {
        line(state.start * state.step, 0, state.stop * state.step, 0);
        rotate(state.angle);
      }
      pop();
    }
  });
}

const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  state.hexagonTrue = randomSelectTwo();

  return ({
    name: 'Outline Shape',
    render: () => {
      stroke(state.layerColour);
      strokeWeight(state.weight);
      push();
      // translate(width / 2, height / 2);
      if (state.hexagonTrue) {
        hexagon(0, 0, CRYSTAL_SIZE / 2);
      } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);
      }
      pop();
    }
  });
}

const dottedLines = (state) => {
  state.numOfShapes = randomSelectTwo() ? state.sides : state.sides * 2;
  state.angle = 360 / state.numOfShapes;
  state.shapeSize = 3;
  state.centerOffset = state.singleStep;

  return ({
    name: 'Dotted Lines',
    render: () => {
      fill(state.layerColour);
      noStroke();
      push();
      // translate(width / 2, height / 2);
      for (let i = 0; i <= state.numOfShapes; i++) {
        for (let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.singleStep) {
          rect(x, 0, state.shapeSize, state.shapeSize);
        }
        rotate(state.angle);
      }
      pop();
    }
  });
}

const centeredShape = (state) => {
  state.randomShape = random(1)
  state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep;

  return ({
    name: 'Centered Shape',
    render: () => {
      fill(state.layerColour);
      noStroke();
      push();
      // translate(width / 2, height / 2);
      if (state.randomShape < 0.1) {
        rect(0, 0, state.shapeSize * 2, state.shapeSize * 2);
      } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
        ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2);
      } else if (state.randomShape >= 0.6) {
        rotate(state.angle / 2);
        hexagon(0, 0, state.shapeSize);
      }
      pop();
    }
  });
}

const ringOfShapes = (state) => {
  state.steps = floor(random(1, state.stepsOut));
  state.center = state.steps * state.singleStep;
  state.randomShape = random(1);
  state.direction = randomSelectTwo(); // used for triangle only
  state.fillColour = randomSelectTwo() ? state.layerColour : color(0, 1);
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;

  if (state.steps < state.stepsOut / 2) {
    state.radius = floor(random(1, state.steps)) * state.singleStep;
  } else if (state.steps > state.stepsOut / 2) {
    state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep;
  } else {
    state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep;
  }

  return ({
    name: 'Ring of Shapes',
    render: () => {
      stroke(state.layerColour);
      fill(state.fillColour);
      strokeWeight(state.weight);
      push();
      // translate(width / 2, height / 2);
      for (let i = 0; i < state.numOfShapes; i++) {
        if (state.randomShape < 0.33) {
          ellipse(0, state.center, state.radius, state.radius);
        } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
          rect(0, state.center, state.radius, state.radius);
        } else if (state.randomShape >= 0.66) {
          myTriangle(state.center, state.radius, state.direction);
        }
        rotate(state.angle);
      }
      pop();
    }
  });
}

const steppedHexagons = (state) => {
  state.numOfSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25;
  state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15;
  state.singleStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numOfSteps;
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke;
  // console.log('numOfSteps', state.numOfSteps);
  // console.log('centerOffset' ,state.centerOffset);
  // console.log('singleStep', state.singleStep);

  return ({
    name: 'Stepped Hexagons',
    render: () => {
      stroke(state.layerColour);
      noFill();
      strokeWeight(state.weight);
      push();
      // translate(width / 2, height / 2);
      rotate(state.angle / 2);
      for (let i = 1; i <= state.numOfSteps; i++) {
        hexagon(0, 0, state.centerOffset + (i * state.singleStep));
      }
      pop();
    }
  });
}