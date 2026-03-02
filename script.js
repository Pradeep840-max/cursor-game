const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class Segment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class FireParticle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 5 + 2;
    this.angle = angle + (Math.random() - 0.5) * 0.4;
    this.life = 50;
    this.size = Math.random() * 6 + 4;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
    this.size *= 0.95;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(0,255,255,${this.life / 50});
    ctx.fill();
  }
}

let dragon = [];
let fire = [];
let segments = 30;
let wingAngle = 0;

for (let i = 0; i < segments; i++) {
  dragon.push(new Segment(mouseX, mouseY));
}

function drawWings(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  wingAngle += 0.15;
  let flap = Math.sin(wingAngle) * 20;

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "cyan";

  // Left wing
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.quadraticCurveTo(-60, -40 + flap, -120, 0);
  ctx.stroke();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.quadraticCurveTo(-60, 40 - flap, -120, 0);
  ctx.stroke();

  ctx.restore();
}

function drawHead(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.shadowBlur = 25;
  ctx.shadowColor = "lime";

  // Head shape
  ctx.fillStyle = "black";
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(50, -25, 90, 0);
  ctx.quadraticCurveTo(50, 25, 0, 0);
  ctx.fill();
  ctx.stroke();

  // Eyes
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(40, -8, 6, 0, Math.PI * 2);
  ctx.arc(40, 8, 6, 0, Math.PI * 2);
  ctx.fill();

  // Pupils
  let eyeOffsetX = Math.cos(angle) * 3;
  let eyeOffsetY = Math.sin(angle) * 3;

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(40 + eyeOffsetX, -8 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.arc(40 + eyeOffsetX, 8 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Head movement
  dragon[0].x += (mouseX - dragon[0].x) * 0.12;
  dragon[0].y += (mouseY - dragon[0].y) * 0.12;

  // Body follow
  for (let i = 1; i < dragon.length; i++) {
    dragon[i].x += (dragon[i - 1].x - dragon[i].x) * 0.25;
    dragon[i].y += (dragon[i - 1].y - dragon[i].y) * 0.25;
  }

  let dx = mouseX - dragon[0].x;
  let dy = mouseY - dragon[0].y;
  let angle = Math.atan2(dy, dx);

  // Fire
  for (let i = 0; i < 3; i++) {
    fire.push(new FireParticle(
      dragon[0].x + Math.cos(angle) * 80,
      dragon[0].y + Math.sin(angle) * 80,
      angle
    ));
  }

  for (let i = fire.length - 1; i >= 0; i--) {
    fire[i].update();
    fire[i].draw();
    if (fire[i].life <= 0) fire.splice(i, 1);
  }

  // Draw body glow
  for (let i = dragon.length - 1; i >= 1; i--) {
    ctx.beginPath();
    ctx.arc(dragon[i].x, dragon[i].y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "cyan";
    ctx.strokeStyle = "cyan";
    ctx.stroke();
  }

  drawWings(dragon[0].x, dragon[0].y, angle);
  drawHead(dragon[0].x, dragon[0].y, angle);

  requestAnimationFrame(animate);
}

animate();
