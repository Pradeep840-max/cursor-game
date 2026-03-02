const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Update canvas size if window resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Track mouse movement
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

let dragon = [];
let segments = 35;

// Create dragon body
for (let i = 0; i < segments; i++) {
  dragon.push(new DragonSegment(mouseX, mouseY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Head follows cursor
  dragon[0].x += (mouseX - dragon[0].x) * 0.15;
  dragon[0].y += (mouseY - dragon[0].y) * 0.15;

  // Body follows previous segment
  for (let i = 1; i < dragon.length; i++) {
    dragon[i].x += (dragon[i - 1].x - dragon[i].x) * 0.25;
    dragon[i].y += (dragon[i - 1].y - dragon[i].y) * 0.25;
  }

  // Draw dragon
  for (let i = dragon.length - 1; i >= 0; i--) {
    ctx.beginPath();
    ctx.arc(dragon[i].x, dragon[i].y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "lime";
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

