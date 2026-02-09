const screens = {
  landing: document.getElementById("landing"),
  message: document.getElementById("message"),
  question: document.getElementById("question"),
  yes: document.getElementById("yesScreen")
};

const startBtn = document.getElementById("startBtn");
const okBtn = document.getElementById("okBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const hearts = document.getElementById("hearts");
const confetti = document.getElementById("confetti");
const ctx = confetti.getContext("2d");
const jumpscare = document.getElementById("jumpscare");
const yt = document.getElementById("yt");

const YT_VIDEO_ID = "J---aiyznGQ";

let noCount = 0;
let jumpscareArmed = false;
const ARM_AT = 3;

/* -------- helpers -------- */
function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function resizeCanvas() {
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* -------- flow -------- */
startBtn.onclick = () => show("message");
okBtn.onclick = () => show("question");

yesBtn.onclick = () => {
  show("yes");
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
  startHearts();
  burstConfetti();
};

/* -------- hearts -------- */
function startHearts() {
  hearts.classList.remove("hidden");
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > 0.5 ? "❤" : "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = "100vh";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 5000);
  }, 300);
}

/* -------- confetti -------- */
function burstConfetti() {
  const pieces = [];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 10,
      size: 4 + Math.random() * 4,
      color: `hsl(${Math.random() * 360},90%,60%)`
    });
  }

  function tick() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);
    pieces.forEach(p => {
      p.vy += 0.3;
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (pieces.some(p => p.y < window.innerHeight)) {
      requestAnimationFrame(tick);
    }
  }
  tick();
}

/* -------- NO button + jumpscare -------- */
noBtn.onmouseenter = noBtn.onclick = (e) => {
  e.preventDefault();
  noCount++;

  if (noCount >= ARM_AT) {
    hint.textContent = "Last warning 😈";
    jumpscareArmed = true;
    return;
  }

  const x = Math.random() * 300;
  const y = Math.random() * 150;
  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
};

noBtn.addEventListener("mouseenter", () => {
  if (jumpscareArmed) triggerJumpscare();
});
noBtn.addEventListener("click", () => {
  if (jumpscareArmed) triggerJumpscare();
});

function triggerJumpscare() {
  jumpscare.classList.remove("hidden");
  playNoise();
  setTimeout(() => jumpscare.classList.add("hidden"), 600);
}

function playNoise() {
  const ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctxAudio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = 120;
  osc.connect(ctxAudio.destination);
  osc.start();
  setTimeout(() => {
    osc.stop();
    ctxAudio.close();
  }, 200);
}
