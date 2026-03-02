let score = 0;
let time = 30;
let timer;

function startGame() {
    score = 0;
    time = 30;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;

    timer = setInterval(() => {
        time--;
        document.getElementById("time").innerText = time;

        if (time <= 0) {
            clearInterval(timer);
            alert("Game Over! Your Score: " + score);
        }
    }, 1000);
}

