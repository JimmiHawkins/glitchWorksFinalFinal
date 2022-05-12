let light = [];
let lightMouse = [];

let song, analyzer;

let mic, fft, fft2;
let f, r, f1, s1, s;
let shape;
let timer = 200;
let vol;
let vid;

var angle = 0;
var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var angle4 = 0;
var angle5 = 0;
var angle6 = 0;
var angle7 = 0;
let f2;
let s2;
let a
let hue1, hue2, hue3;
let pixel
let ran
let velocityX
let velocityY

function preload() {
  song = loadSound("song1.mp3");
  tri = loadImage("tri.png");
}

function setup() {
  c = createCanvas(1920, 1080);

  song.loop();

  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);

  //for mic
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  fft.setInput(song);

  hue3 = 0;
  hue1 = 170;
  hue2 = 280;

  s2 = 100;
  s=0
  a=0.2
  
  ran=10
  
  pixel =500
  
  velocityX = 1
  velocityY = 1

  angleMode(DEGREES);
  frameRate(120);

  rectMode(CENTER);

  vid = createVideo(["glitchVid.mov"]);
  vid.hide();

  vid.loop();
}

function draw() {
  
  
  background(255, 0, r, a);

  let rms = analyzer.getLevel();
  let micro = mic.getLevel();

  let rmsRound = round(rms * 30);

  //console.log()

  if (micro > 0.29) {
    imageMode(CORNER);

    image(vid, 0, 0, width, height);
    s = 0;
    s2 = 0;
  }

  fill(255);
  stroke(255);
  strokeWeight(2);
  //rect(width, height, 30, round(rms, 2) * 5000);
  //rect(width - 1920, height, 30, round(rms, 2) * 5000);
  fill(255);
  noStroke();
  rect(width / 2, height - 25, timer * 9.5, 10);

  textSize(59);
  text(round(rmsRound, 1), width / 2, height - 100);

  text(timer, width / 2, height - 50);

  colorMode(HSB);
  stroke(f, s, 100);

  for (let m = 0; m < lightMouse.length; m++) {
    lightMouse[m].update();
    lightMouse[m].draw();
  }

  if (lightMouse.length > rms * pixel) {
    let length = lightMouse.length;

    lightMouse = lightMouse.slice(length - rms * pixel, length);
  }

  if (frameCount % 60 == 0 && timer > 0) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer--;
  }

  if (mouseIsPressed) {
    console.log(mouseX, mouseY);
  }

  if (timer < 70) {
    hue3 = random(190, 120);
    hue1 = 190;
    hue2 = 120;
  }

  if (timer < 172 && timer > 151) {
    pixel = 500
    a=0.09
    s = analyzer.getLevel() * 400;
    hue3 = random(0, 10);
  }

  if (timer > 33) {
    let newBall = new twoLightBall(width / 2 - 15,height / 2 - 10, 100, 0, 0
    );
    append(lightMouse, newBall);
  }

  if(rms < 0.16){
    
  }
  if (rms > 0) {
    f1 = 0;
    
    r = 0;

    shape = rect;
  }

  if ((timer < 148 && timer > 78) || (rms > 0.3 && timer > 74)) {
    shape = rect;
    noFill();
    stroke(255);
    strokeWeight(5);

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(0, 0, 50 + rms * 200);
    angle += rms * 2;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle1);
    rect(0, 0, 100 + rms * 200);
    angle1 += rms * 2;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(0, 0, 150 + rms * 200);
    angle += rms * 2;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle1);
    rect(0, 0, 50 + rms * 200);
    angle1 -= rms * 2;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle);
    rect(0, 0, 100 + rms * 200);
    angle -= rms * 2;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle1);
    rect(0, 0, 150 + rms * 200);
    angle1 -= rms * 2;
    pop();
  }
  if (rms > 0.21 && rms < 0.28) {
    let newBall = new twoLightBall(width - 300, height / 2 + 20, 100, -10, 10);
    append(lightMouse, newBall);
    let newBall2 = new twoLightBall(width - 1640, height / 2 + 20, 100, 10, 10);
    append(lightMouse, newBall2);

    shape = rect;
  }

  if (rms > 0.16 && rms < 0.2) {
    
    
    fill(f, s, 100);
    noStroke();
    imageMode(CENTER);
    image(tri, width - 300, height / 2, 150, 150);
    image(tri, width - 1620, height / 2, 150, 150);
  }

  if (timer < 153 && timer > 68) {
    s = analyzer.getLevel() * 400;
    hue3 = random(180, 270);
    noFill();
    stroke(255);
    ellipse(-1, -1, rms * 2000);
    ellipse(1921, -1, rms * 2000);
  }

  if (rms > 0.3) {
    r = 70;
    //console.log(timer);
    f1 = 350;

    s1 = 0;

    wave();

    let newTri = new triShape(925, 520, 100, 0.5, 0.5);
    append(lightMouse, newTri);
    let newTri2 = new triShape2(925, 560, 100, 0.5, 0.5);
    append(lightMouse, newTri2);
    colorMode(HSB);

    if (micro > 0.29) {
      s = 0;
    }

    fill(hue3, s, 100);
    stroke(f1, s1, 100);
    push();
    rectMode(CENTER);
    translate(width - 300, height / 2);
    rotate(angle);
    rect(0, 0, rms * 700);
    angle4 += rms * 5;
    pop();

    push();
    rectMode(CENTER);
    translate(width - 1620, height / 2);
    rotate(angle1);
    rect(0, 0, rms * 700);
    angle5 -= rms * 5;
    pop();

    noFill();
  }

  if (timer < 140) {
    imageMode(CENTER);
    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle6);
    image(tri, 0, 250, 150, 150);
    angle6 -= 1.5;
    pop();

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);
    rotate(angle7);
    image(tri, 0, 250, 150, 150);
    angle7 += 1.5;
    pop();
  }
}

class twoLightBall {
  constructor(x, y, d, velX, velY) {
    this.x = x;
    this.y = y;
    this.velocityX = velX;
    this.velocityY = velY;
    this.diameter = d;
  }

  update() {
    this.y -= this.velocityY;
    this.velocityY += sin(millis() / random());

    this.x += this.velocityX + random();
    this.velocityX += sin(millis() / random());

    if (this.diameter < 10000) {
      this.diameter *= 0.99;
    }
    if (this.diameter < 1) {
      this.diameter = 0;
    }
    this.velocityX *= velocityX;

    this.velocityY *= velocityY;

    this.diameter = 10;
  }

  draw() {
    drawTwoCircle(this.x, this.y, this.diameter);
  }
}

class triShape {
  constructor(x, y, d, velX, velY) {
    this.x = x;
    this.y = y;
    this.velocityX = velX;
    this.velocityY = velY;
    this.diameter = d;
  }

  update() {
    this.y += this.velocityY + 25;
    this.velocityY *= sin(millis());

    this.x += this.velocityX *= 1;
    this.velocityX += sin(millis());

    if (this.diameter < 10000) {
      this.diameter *= 0.99;
    }
    if (this.diameter < 1) {
      this.diameter = 0;
    }
    this.velocityX *= 1.1;

    this.velocityY *= 1.1;

    this.diameter = 10;
  }

  draw() {
    drawTriShape(this.x, this.y, this.diameter);
  }
}

class triShape2 {
  constructor(x, y, d, velX, velY) {
    this.x = x;
    this.y = y;
    this.velocityX = velX;
    this.velocityY = velY;
    this.diameter = d;
  }

  update() {
    this.y -= this.velocityY + 25;
    this.velocityY *= sin(millis());

    this.x -= this.velocityX *= 1;
    this.velocityX += sin(millis());

    if (this.diameter < 10000) {
      this.diameter *= 0.99;
    }
    if (this.diameter < 1) {
      this.diameter = 0;
    }
    this.velocityX *= 1.1;

    this.velocityY *= 1.1;

    this.diameter = 10;
  }

  draw() {
    drawTriShape2(this.x, this.y, this.diameter);
  }
}

function wave2() {
  strokeWeight(5);
  stroke(f1, s1, 100);
  beginShape();
  noFill();
  colorMode(HSB);

  let waveform2 = fft.waveform();
  for (let i = 0; i < waveform2.length; i++) {
    let x = map(i, 0, waveform2.length, 0, width);
    let y = map(waveform2[i], -10, 10, 0, height);
    vertex(x, y);
  }

  endShape();
}

function wave() {
  strokeWeight(5);
  stroke(f1, s1, 100);
  beginShape();
  noFill();
  colorMode(HSB);

  let waveform = fft.waveform();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, -500, waveform.length, 0, width - 950);
    let y = map(waveform[i], -10, 10, 0, height);
    vertex(x, y);
  }

  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, -1500, waveform.length, 0, width - 300);
    let y = map(waveform[i], -10, 10, 0, height);
    vertex(x, y);
  }

  endShape();
}

function drawTwoCircle(x, y, d) {
  noStroke();
  //stroke(f+20,s-20,50)
  strokeWeight(2);
  rectMode(CENTER);
  colorMode(HSB);

  fill(hue3, s, 100);

  rect(x + random(ran), y + random(ran), d + analyzer.getLevel() * 50);
}

function drawTriShape(x, y) {
  noStroke();
  //stroke(f+20,s-20,50)
  strokeWeight(2);
  rectMode(CENTER);
  colorMode(HSB);

  fill(random(hue1, hue2), s, 100);
  triangle(x + 10, y + 55, x + 38, y + 10, x + 66, y + 55);
}
function drawTriShape2(x, y) {
  noStroke();
  //stroke(f+20,s-20,50)
  strokeWeight(2);
  rectMode(CENTER);
  colorMode(HSB);

  fill(random(hue1, hue2), s, 100);
  triangle(x + 10, y - 55, x + 38, y - 10, x + 66, y - 55);
}
