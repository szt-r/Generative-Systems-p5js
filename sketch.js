function setup() {
  createCanvas(500, 500, SVG);
  noLoop();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);
  noStroke();
  fill(0);

  push();
  translate(width / 2, height / 2);
  rotate(45);
  rect(0, 0, 25, 25);
  pop();

  fill('red');
  rect(0, 0, 25, 25);
}