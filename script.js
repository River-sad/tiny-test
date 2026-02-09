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

const yt = document.getElementById("yt");

// Replace with your happy cat YouTube video ID
const YT_VIDEO_ID = "J---aiyznGQ";

// ---- Screen helper ----
function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ---- Hearts background ----
// Creates a bunch of hearts and sets them floating indefinitely
function initHearts(count = 28) {
  heartsLayer.innerHTML = "";

  const heartChars = ["❤", "💖", "💕", "💗"];

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];

    const size = 12 + Math.random() * 20;          // px
    const left = Math.random() * 100;              // vw
    const delay = Math.random() * 10;              // seconds
    const duration = 8 + Math.random() * 10;       // seconds

    h.style.fontSize = `${size}px`;
    h.style.left = `${left}vw`;

    // Stagger vertical start positions so they’re already on screen
    h.style.top = `${Math.random() * 100}vh`;

    h.style.animationDuration = `${duration}s`;
    h.style.animationDelay = `-${delay}s`; // negative = starts mid-animation

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

startBtn.addEventListener("click", () => show("message"));
okBtn.addEventListener("click", () => show("question"));

yesBtn.addEventListener("click", () => {
  burstConfetti();
  show("yes");
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
});

restartBtn.addEventListener("click", () => {
  yt.src = "";
  hint.textContent = "";
  resetNoButton();
  noCount = 0;
  show("question");
});

// ---- No button teleport ----
let noCount = 0;

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

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Nice try 😅",
    "Nope 🙃",
    "You sure? 👀",
    "This button is shy…",
    "Okay okay 😂"
  ];
  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
}

function resetNoButton() {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

// Hover (desktop)
noBtn.addEventListener("mouseenter", moveNoButton);

// Tap (mobile)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
