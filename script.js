const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let dragon = [];
let length = 25;

for (let i = 0; i < length; i++) {
  dragon.push({ x: mouse.x, y: mouse.y });
}

let wingTime = 0;

function drawWings(x, y, angle, speed) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Smooth sinusoidal flap
  wingTime += 0.08 + speed * 0.02;
  let flap = Math.sin(wingTime) * 40;

  ctx.lineWidth = 3;
  ctx.strokeStyle = "cyan";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "cyan";

  // Left Wing
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.bezierCurveTo(
    -60, -50 + flap,
    -120, -50 + flap,
    -150, 0
  );
  ctx.stroke();

  // Right Wing
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.bezierCurveTo(
    -60, 50 - flap,
    -120, 50 - flap,
    -150, 0
  );
  ctx.stroke();

  ctx.restore();
}

function drawHead(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.lineWidth = 3;
  ctx.strokeStyle = "lime";
  ctx.shadowBlur = 25;
  ctx.shadowColor = "lime";

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(50, -25, 90, 0);
  ctx.quadraticCurveTo(50, 25, 0, 0

