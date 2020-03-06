const CRYSTAL_SIZE = 500;
const SIDES = 6;
let PALETTE = [];
const layers = [];

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
  background(255);

  layerConstructors.forEach(lcon => {
    let picker = random(1);
    if (picker > lcon.weight) {
      layers.push(lcon.init())
    }
  })

  layers.forEach(layer => layer.render());

  console.log(layers);
}