let score = 0;
let timeLeft = 30;
let level = 1;
let combo = 0;
let speed = 800;
let gameInterval;
let timerInterval;

const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const levelDisplay = document.getElementById("level");
const comboDisplay = document.getElementById("combo");
const gameArea = document.getElementById("gameArea");
const modal = document.getElementById("gameOverModal");
const finalScore = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");

function randomPosition() {
    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.left = randomX + "px";
    target.style.top = randomY + "px";
}

function startGame() {
    score = 0;
    timeLeft = 30;
    level = 1;
    combo = 0;
    speed = 800;

    updateUI();
    modal.style.display = "none";
    target.style.display = "block";

    gameInterval = setInterval(randomPosition, speed);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateUI();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function updateUI() {
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    levelDisplay.textContent = level;
    comboDisplay.textContent = combo;
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    target.style.display = "none";
    finalScore.textContent = score;
    modal.style.display = "flex";
}

function restartGame() {
    startGame();
}

target.addEventListener("click", () => {
    score += 10;
    combo++;
    
    if (combo % 5 === 0) {
        level++;
        speed -= 100;
        clearInterval(gameInterval);
        gameInterval = setInterval(randomPosition, speed);
    }
