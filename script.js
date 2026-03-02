const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let x = canvas.width / 2;
let y = canvas.height / 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  x += (mouseX - x) * 0.1;
  y += (mouseY - y) * 0.1;

  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 3;
  ctx.stroke();

  requestAnimationFrame(animate);
}

animate();
