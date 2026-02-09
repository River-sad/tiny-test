// ---- Elements ----
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
const restartBtn = document.getElementById("restartBtn");

const hint = document.getElementById("hint");

const heartsLayer = document.getElementById("hearts");

const confettiCanvas = document.getElementById("confetti");
const cctx = confettiCanvas.getContext("2d");

const jumpscare = document.getElementById("jumpscare");
const yt = document.getElementById("yt");

// Replace with your happy cat YouTube video ID
const YT_VIDEO_ID = "J---aiyznGQ";

// ---- Screen helper ----
function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ---- Hearts background (always on) ----
function initHearts(count = 26) {
  heartsLayer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = Math.random() > 0.5 ? "❤" : "💖";

    const size = 12 + Math.random() * 18;
    const left = Math.random() * 100;      // vw
    const delay = Math.random() * 8;       // s
    const duration = 7 + Math.random() * 9;// s

    h.style.fontSize = `${size}px`;
    h.style.left = `${left}vw`;
    h.style.top = `${Math.random() * 100}vh`; // scatter starting positions
    h.style.animationDuration = `${duration}s`;
    h.style.animationDelay = `-${delay}s`;    // negative so they’re already moving

    heartsLayer.appendChild(h);
  }
}

initHearts();

// ---- Confetti ----
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti() {
  const W = confettiCanvas.width;
  const H = confettiCanvas.height;

  let pieces = [];
  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: W / 2,
      y: H / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 12 - 4,
      g: 0.35 + Math.random() * 0.2,
      size: 3 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: `hsl(${Math.floor(Math.random() * 360)}, 90%, 65%)`
    });
  }

  function tick() {
    cctx.clearRect(0, 0, W, H);

    pieces.forEach(p => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate(p.rot);
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      cctx.restore();
    });

    pieces = pieces.filter(p => p.y < H + 50);

    if (pieces.length) requestAnimationFrame(tick);
    else cctx.clearRect(0, 0, W, H);
  }

  tick();
}

// ---- Flow ----
show("landing");

startBtn.onclick = () => show("message");
okBtn.onclick = () => show("question");

yesBtn.onclick = () => {
  burstConfetti();
  show("yes");
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
};

restartBtn.onclick = () => {
  yt.src = "";
  hint.textContent = "";
  resetNoButton();
  noCount = 0;
  armed = false;
  show("question");
};

// ---- No button teleport + jumpscare ----
let noCount = 0;
let armed = false;
// set how many dodges before arming jumpscare
const ARM_AT = 5;

function moveNoButton() {
  noCount++;

  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const pad = 16;

  const maxX = rect.width - btnRect.width - pad;
  const maxY = rect.height - btnRect.height - pad;

  const x = rect.left + pad + Math.random() * Math.max(1, maxX);
  const y = rect.top + pad + Math.random() * Math.max(1, maxY);

  // place relative to viewport with fixed positioning
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Nice try 😅",
    "Nope 🙃",
    "You sure? 👀",
    "This button is shy…",
    "Final warning… don’t touch it again 😈"
  ];
  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];

  if (noCount >= ARM_AT) armed = true;
}

function resetNoButton() {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

function triggerJumpscare() {
  armed = false; // one-time
  playScream();  // loud-ish

  jumpscare.classList.remove("hidden");
  setTimeout(() => {
    jumpscare.classList.add("hidden");
    // keep it playful: after scare, move it again
    moveNoButton();
  }, 550);
}

// Trigger on hover (desktop)
noBtn.addEventListener("mouseenter", () => {
  if (armed) return triggerJumpscare();
  moveNoButton();
});

// Trigger on click (mobile)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (armed) return triggerJumpscare();
  moveNoButton();
});

// ---- Loud “scream” (Web Audio) ----
// NOTE: browsers require user interaction before audio plays.
// Your page already has Start/OK clicks, so it should work.
function playScream() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioContext();

    // 1) White noise burst
    const noiseDur = 0.35;
    const bufferSize = Math.floor(ac.sampleRate * noiseDur);
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // harsher noise at start
      const t = i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * (1 -
