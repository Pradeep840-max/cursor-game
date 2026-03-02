const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Segment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let dragon = [];
let length = 40; // dragon body length

// Create dragon body
for (let i = 0; i < length; i++) {
  dragon.push(new Segment(mouse.x, mouse.y));
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Head follows mouse
  dragon[0].x += (mouse.x - dragon[0].x) * 0.2;
  dragon[0].y += (mouse.y - dragon[0].y) * 0.2;

  // Body follows previous segment
  for (let i = 1; i < dragon.length; i++) {
    dragon[i].x += (dragon[i - 1].x - dragon[i].x) * 0.3;
    dragon[i].y += (dragon[i - 1].y - dragon[i].y) * 0.3;
  }

  // Draw dragon
  for (let i = dragon.length - 1; i >= 0; i--) {
    ctx.beginPath();
    ctx.arc(dragon[i].x, dragon[i].y, 8 - i * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = hsl(${i * 10}, 100%, 50%);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
