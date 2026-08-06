// ===============================
// SECRET PIN SYSTEM
// ===============================

let pin = "";

const correctPin = "1234";

const dots = [
    document.getElementById("d1"),
    document.getElementById("d2"),
    document.getElementById("d3"),
    document.getElementById("d4")
];

const message = document.getElementById("message");
const lockScreen = document.querySelector(".lock-screen");

// ===============================
// PRESS NUMBER
// ===============================

function press(number){

    if(pin.length >= 4) return;

    pin += number;

    updateDots();

}

// ===============================
// UPDATE DOTS
// ===============================

function updateDots(){

    dots.forEach(dot => dot.classList.remove("active"));

    for(let i=0;i<pin.length;i++){

        dots[i].classList.add("active");

    }

}

// ===============================
// CLEAR
// ===============================

function clearPin(){

    pin = pin.slice(0,-1);

    updateDots();

    message.innerHTML = "";

}

// ===============================
// CHECK PIN
// ===============================

function checkPin(){

    if(pin === correctPin){

        message.style.color="#7CFC00";
        message.innerHTML="Access Granted ✓";

        document.body.classList.add("fade");

        setTimeout(()=>{

            window.location.href="intro.html";

        },800);

    }

    else{

        message.style.color="#ff6b6b";
        message.innerHTML="Wrong PIN!";

        lockScreen.classList.add("shake");

        setTimeout(()=>{

            lockScreen.classList.remove("shake");

        },350);

        pin="";

        updateDots();

    }

}

// ===============================
// ENTER KEY SUPPORT
// ===============================

document.addEventListener("keydown",(e)=>{

    if(!isNaN(e.key) && pin.length<4){

        press(e.key);

    }

    if(e.key==="Backspace"){

        clearPin();

    }

    if(e.key==="Enter"){

        checkPin();

    }

});
