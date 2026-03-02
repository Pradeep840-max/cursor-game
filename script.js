const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let segments = [];
let length = 25;

for (let i = 0; i < length; i++) {
  segments.push({ x: mouse.x, y: mouse.y });
}

let wingTime = 0;

function drawWings(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  wingTime += 0.1;
  let flap = Math.sin(wingTime) * 20;

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 3;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "cyan";

  // left wing
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.quadraticCurveTo(-60, -40 + flap, -120, 0);
  ctx.stroke();

  // right wing
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
  ctx.strokeStyle = "lime";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(40, -20, 80, 0);
  ctx.quadraticCurveTo(40, 20, 0, 0);
  ctx.stroke();

  // eyes
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(35, -7, 5, 0, Math.PI * 2);
  ctx.arc(35, 7, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // head follow
  segments[0].x += (mouse.x - segments[0].x) * 0.1;
  segments[0].y += (mouse.y - segments[0].y) * 0.1;

  for (let i = 1; i < segments.length; i++) {
    segments[i].x += (segments[i - 1].x - segments[i].x) * 0.3;
    segments[i].y += (segments[i - 1].y - segments[i].y) * 0.3;
  }

  let dx = mouse.x - segments[0].x;
  let dy = mouse.y - segments[0].y;
  let angle = Math.atan2(dy, dx);

  // body
  ctx.shadowBlur = 20;
  ctx.shadowColor = "cyan";
  ctx.strokeStyle = "cyan";

  for (let i = 1; i < segments.length; i++) {
    ctx.beginPath();
    ctx.arc(segments[i].x, segments[i].y, 6, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawWings(segments[0].x, segments[0].y, angle);
  drawHead(segments[0].x, segments[0].y, angle);

  requestAnimationFrame(animate);
}

animate();

