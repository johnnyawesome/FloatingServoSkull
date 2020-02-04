/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

let skull;

//Noise Wave starting values
let xOff = 6;
let yOff = 12;
let zOff = 44;

//Skull Z-Swing
let amplitude = 2000;
let z = 0;
//Laser swing
let laserSweep = 0;

//Loads the model
function preload() {
  skull = loadModel("../Object/GitHubLogoServoSkull.obj");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES);
}

function draw() {

  background(0);

  //Iterates the noise seeds
  xOff += 0.005;
  yOff += 0.005;
  zOff += 0.005;

  noStroke();

  //Calculates new noise vlaues
  let noiseX = noise(xOff) * width - 400;
  let noiseY = noise(yOff) * height - 400;
  let noiseZ = noise(zOff) * - 2000;

  z += 0.3;
  laserSweep += 3;

  //Rotates the model a bit for a more natural movement
  rotateX(noiseX * -0.15);
  rotateY(noiseY * 0.15);
  rotateZ(noiseZ * 0.005);

  let zSwing = amplitude * sin(z) - 2200;

  //Translates the new origin point to spawn the skull
  translate(noiseX, noiseY, zSwing);

  //Limit framerate to slow down animation
  frameRate(30);

  //Turns skull as it goes back and forth
  rotateY(map(zSwing, -200, -4200, 0, 180))

  //Flip 180 degrees, cause model loads upside down
  rotateZ(180);

  //Lighting
  ambientLight(10, 10, 10);
  directionalLight(126, 126, 126, noiseX, 0, -1000);
  specularMaterial(250)

  //Laserbeams from the eye-socket
  push();
  translate(58, 90, 40);
  //strokeWeight(3);


  for (let i = 0; i < 50; i++) {
    strokeWeight(0.8)
    stroke(255, 0, 0, 0);

    line(0, 0, 0, i * 30, 700 * sin(laserSweep), 2000);
  }
  strokeWeight(2)
  sphere(8);
  pop();

  //Draws the skull
  model(skull);
}