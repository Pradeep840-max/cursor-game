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

class DragonSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class FireParticle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 4 + 2;
    this.angle = angle + (Math.random() - 0.5) * 0.3;
    this.life = 60;
    this.size = Math.random() * 6 + 4;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
    this.size *= 0.96;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(255, ${Math.random() * 150}, 0, ${this.life / 60});
    ctx.fill();
  }
}

let dragon = [];
let fire = [];
let segments = 30;

for (let i = 0; i < segments; i++) {
  dragon.push(new DragonSegment(mouseX, mouseY));
}

function drawDragonHead(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Head shape
  ctx.fillStyle = "darkgreen";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(40, -25, 80, 0);
  ctx.quadraticCurveTo(40, 25, 0, 0);
  ctx.fill();

  // Horns
  ctx.fillStyle = "lightgreen";
  ctx.beginPath();
  ctx.moveTo(20, -10);
  ctx.lineTo(30, -30);
  ctx.lineTo(40, -10);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(20, 10);
  ctx.lineTo(30, 30);
  ctx.lineTo(40, 10);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(30, -8, 6, 0, Math.PI * 2);
  ctx.arc(30, 8, 6, 0, Math.PI * 2);
  ctx.fill();

  // Pupils follow cursor
  let eyeOffsetX = Math.cos(angle) * 3;
  let eyeOffsetY = Math.sin(angle) * 3;

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(30 + eyeOffsetX, -8 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.arc(30 + eyeOffsetX, 8 + eyeOffsetY, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Head follows cursor
  dragon[0].x += (mouseX - dragon[0].x) * 0.12;
  dragon[0].y += (mouseY - dragon[0].y) * 0.12;

  // Body follows
  for (let i = 1; i < dragon.length; i++) {
    dragon[i].x += (dragon[i - 1].x - dragon[i].x) * 0.25;
    dragon[i].y += (dragon[i - 1].y - dragon[i].y) * 0.25;
  }

  // Direction angle
  let dx = mouseX - dragon[0].x;
  let dy = mouseY - dragon[0].y;
  let angle = Math.atan2(dy, dx);

  // Fire particles
  for (let i = 0; i < 3; i++) {
    fire.push(new FireParticle(dragon[0].x + Math.cos(angle) * 60,
                               dragon[0].y + Math.sin(angle) * 60,
                               angle));
  }

  for (let i = fire.length - 1; i >= 0; i--) {
    fire[i].update();
    fire[i].draw();
    if (fire[i].life <= 0) fire.splice(i, 1);
  }

  // Draw body
  for (let i = dragon.length - 1; i >= 1; i--) {
    ctx.beginPath();
    ctx.arc(dragon[i].x, dragon[i].y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
  }

  // Draw head
  drawDragonHead(dragon[0].x, dragon[0].y, angle);

  requestAnimationFrame(animate);
}

animate();

