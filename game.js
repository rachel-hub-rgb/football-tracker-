const player = document.getElementById("player");

let x = 384;
let y = 234;

const speed = 4;

const keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

function gameLoop() {

    if (keys["ArrowUp"] || keys["w"]) {
        y -= speed;
    }

    if (keys["ArrowDown"] || keys["s"]) {
        y += speed;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
        x -= speed;
    }

    if (keys["ArrowRight"] || keys["d"]) {
        x += speed;
    }

    // Keep player inside the map

    x = Math.max(0, Math.min(768, x));
    y = Math.max(0, Math.min(468, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();
