// =====================================================
// PLAYER
// =====================================================

const player = document.getElementById("player");

let x = 380;
let y = 350;

const speed = 4;

const keys = {};


// =====================================================
// GAME STATE
// =====================================================

let questStarted = false;
let hasKey = false;
let houseUnlocked = false;


// =====================================================
// KEYBOARD
// =====================================================

document.addEventListener("keydown", function(event) {

    keys[event.key] = true;

});


document.addEventListener("keyup", function(event) {

    keys[event.key] = false;

});


// =====================================================
// DISTANCE
// =====================================================

function distanceFrom(element) {

    const ex = element.offsetLeft;
    const ey = element.offsetTop;

    const dx = x - ex;
    const dy = y - ey;

    return Math.sqrt(dx * dx + dy * dy);

}


// =====================================================
// DIALOGUE
// =====================================================

let dialogueIndex = 0;

let currentDialogue = [];


function startDialogue(name, lines) {

    currentDialogue = lines;

    dialogueIndex = 0;

    document.getElementById("speaker").innerText = name;

    document.getElementById("message").innerText =
        currentDialogue[dialogueIndex];

    document.getElementById("dialogue").style.display = "block";

}


function nextDialogue() {

    dialogueIndex++;

    if (dialogueIndex >= currentDialogue.length) {

        document.getElementById("dialogue").style.display = "none";

        return;

    }

    document.getElementById("message").innerText =
        currentDialogue[dialogueIndex];

}


// =====================================================
// INTERACTION
// =====================================================

document.addEventListener("keydown", function(event) {

    if (event.key.toLowerCase() !== "e") return;


    // Talk to NPC

    const npc = document.getElementById("npc");

    if (distanceFrom(npc) < 70) {

        if (!questStarted) {

            questStarted = true;

            document.getElementById("quest").innerText =
                "Quest: Find the old man's key.";

            document.getElementById("key").style.display =
                "block";


            startDialogue(
                "Old Man",
                [
                    "Hey... you there!",
                    "I seem to have lost my old key.",
                    "I think I dropped it somewhere near the trees.",
                    "Could you find it for me?"
                ]
            );

        }

        else if (hasKey) {

            hasKey = false;

            houseUnlocked = true;

            document.getElementById("quest").innerText =
                "Quest Complete! Enter the house.";

            startDialogue(
                "Old Man",
                [
                    "You found it!",
                    "I thought that key was gone forever.",
                    "The house is open now.",
                    "There's something inside waiting for you."
                ]
            );

        }

        else {

            startDialogue(
                "Old Man",
                [
                    "Keep looking.",
                    "I think I dropped the key somewhere nearby."
                ]
            );

        }

    }


    // Enter house

    const house = document.getElementById("house");

    if (
        distanceFrom(house) < 100 &&
        houseUnlocked
    ) {

        startDialogue(
            "???",
            [
                "You step inside...",
                "The room is completely silent.",
                "Then you notice something on the table.",
                "A mysterious letter."
            ]
        );

    }

});


// =====================================================
// COLLECT KEY
// =====================================================

function checkKey() {

    const key = document.getElementById("key");

    if (
        key.style.display !== "none" &&
        distanceFrom(key) < 50
    ) {

        hasKey = true;

        key.style.display = "none";

        document.getElementById("quest").innerText =
            "Quest: Return the key to the old man.";

        startDialogue(
            "Game",
            [
                "You found the old man's key!",
                "Return it to him."
            ]
        );

    }

}


// =====================================================
// MOVEMENT
// =====================================================

function gameLoop() {

    if (
        document.getElementById("dialogue").style.display !== "block"
    ) {

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

    }


    // Map boundaries

    x = Math.max(0, Math.min(765, x));

    y = Math.max(0, Math.min(465, y));


    player.style.left = x + "px";
    player.style.top = y + "px";


    checkKey();


    requestAnimationFrame(gameLoop);

}


gameLoop();
