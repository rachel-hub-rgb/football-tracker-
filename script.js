/* ===========================
   GLOBAL
=========================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

html{
    scroll-behavior:smooth;
}

body{

    font-family:'Poppins',sans-serif;

    background:#020617;

    color:white;

    overflow-x:hidden;

    text-align:center;

}

/* ===========================
   STAR BACKGROUND
=========================== */

#stars{

    position:fixed;

    inset:0;

    background:
    radial-gradient(white 1px,transparent 1px),
    radial-gradient(#9ad0ff 1px,transparent 1px);

    background-size:60px 60px,120px 120px;

    animation:moveStars 120s linear infinite;

    opacity:.55;

    z-index:-3;

}

@keyframes moveStars{

    from{

        transform:translateY(0);

    }

    to{

        transform:translateY(-1000px);

    }

}

/* ===========================
   SECTION
=========================== */

section{

    min-height:100vh;

    display:none;

    justify-content:center;

    align-items:center;

    flex-direction:column;

    padding:40px 20px;

}

.active{

    display:flex;

}

.hidden{

    display:none;

}

/* ===========================
   HEADINGS
=========================== */

h1{

    font-size:4rem;

    margin-bottom:15px;

}

h2{

    font-size:2rem;

    margin-bottom:20px;

}

h3{

    font-size:1.6rem;

    margin-bottom:10px;

}

p{

    max-width:700px;

    line-height:1.7;

    color:#d7d7d7;

    margin-bottom:25px;

}

/* ===========================
   BUTTON
=========================== */

button{

    padding:15px 35px;

    border:none;

    border-radius:40px;

    cursor:pointer;

    background:linear-gradient(45deg,#5b21b6,#3b82f6);

    color:white;

    font-size:1rem;

    font-weight:600;

    transition:.35s;

}

button:hover{

    transform:translateY(-4px) scale(1.05);

    box-shadow:0 0 25px #60a5fa;

}

/* ===========================
   MUSIC
=========================== */

#musicBtn{

    position:fixed;

    top:20px;

    right:20px;

    width:55px;

    height:55px;

    border-radius:50%;

    z-index:999;

}

/* ===========================
   LOADER
=========================== */

.loader{

    width:320px;

    height:14px;

    background:#1f2937;

    border-radius:30px;

    overflow:hidden;

    margin:30px auto;

}

.bar{

    width:0%;

    height:100%;

    background:linear-gradient(90deg,#38bdf8,#8b5cf6);

    animation:loading 5s forwards;

}

@keyframes loading{

    to{

        width:100%;

    }

}

/* ===========================
   TERMINAL
=========================== */

.terminal{

    width:90%;

    max-width:750px;

    background:rgba(255,255,255,.08);

    border:1px solid rgba(255,255,255,.15);

    backdrop-filter:blur(12px);

    padding:40px;

    border-radius:18px;

    text-align:left;

}

.terminal p{

    color:#4ade80;

    margin:10px 0;

}

.terminal h1{

    text-align:center;

    color:#60a5fa;

}

/* ===========================
   GIFT
=========================== */

#giftBox{

    font-size:7rem;

    cursor:pointer;

    margin:40px;

    transition:.4s;

}

#giftBox:hover{

    transform:scale(1.15) rotate(-8deg);

}

/* ===========================
   BIRTHDAY
=========================== */

.name{

    font-size:5rem;

    color:#facc15;

    text-shadow:
    0 0 10px #facc15,
    0 0 30px orange;

}

/* ===========================
   AI SYSTEM
=========================== */

pre{

    background:rgba(255,255,255,.08);

    padding:30px;

    border-radius:15px;

    font-size:1rem;

    line-height:2;

    max-width:650px;

    overflow:auto;

}

/* ===========================
   LETTER
=========================== */

.letterBox{

    background:rgba(255,255,255,.08);

    backdrop-filter:blur(12px);

    border-radius:20px;

    padding:40px;

    max-width:750px;

    text-align:left;

    box-shadow:0 0 35px rgba(255,255,255,.08);

}

/* ===========================
   GALLERY
=========================== */

.gallery{

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

    gap:20px;

    width:95%;

    max-width:1100px;

    margin:40px auto;

}

.gallery img{

    width:100%;

    border-radius:15px;

    transition:.35s;

    cursor:pointer;

}

.gallery img:hover{

    transform:scale(1.05);

    box-shadow:0 0 25px #38bdf8;

}

/* ===========================
   FINAL
=========================== */

#final h1{

    color:#facc15;

    text-shadow:
    0 0 15px gold,
    0 0 40px orange;

}

#fireworks{

    width:100%;

    height:300px;

}
