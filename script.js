const dragon = document.getElementById("dragon");

let mouseX = 0;
let mouseY = 0;

let dragonX = 0;
let dragonY = 0;

// Track mouse position
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth animation loop
function animate() {
    // Move dragon slowly toward mouse
    dragonX += (mouseX - dragonX) * 0.05;
    dragonY += (mouseY - dragonY) * 0.05;

    dragon.style.left = dragonX + "px";
    dragon.style.top = dragonY + "px";

    requestAnimationFrame(animate);
}

animate();
