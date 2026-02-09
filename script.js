// ---------- Elements ----------
const startBtn = document.getElementById("startBtn");
const okBtn = document.getElementById("okBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");

const landing = document.getElementById("landing");
const message = document.getElementById("message");
const question = document.getElementById("question");
const yesScreen = document.getElementById("yesScreen");

const hint = document.getElementById("hint");

const heartsLayer = document.getElementById("hearts");
const jumpscare = document.getElementById("jumpscare");

const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

const yt = document.getElementById("yt");

// Replace with your happy cat YouTube video ID
const YT_VIDEO_ID = "J---aiyznGQ";

// ---------- Screen helpers ----------
function showScreen(screenEl) {
  // Remove active from all
  [landing, message, question, yesScreen].forEach(el => {
    el.classList.remove("active");
    el.classList.add("hidden");
  });

  screenEl.classList.remove("hidden");
  // Let layout happen then animate in
  requestAnimationFrame(() => screenEl.classList.add("active"));
}

// Initial state
showScreen(landing);

// ---------- Flow ----------
startBtn.addEventListener("click", () => showScreen(message));
okBtn.addEventListener("click", () => showScreen(question));

restartBtn.addEventListener("click", () => {
  // reset everything
  yt.src = "";
  hint.textContent = "";
  resetNoButton();
  noCount = 0;
  jumpscareArmed = false;
  showScreen(question);
});

// ---------- YES: hearts + confetti + cat ----------
let heartsInterval = null;

yesBtn.addEventListener("click", () => {
  // Hearts start ONLY after yes
  startHearts();

  // Confetti burst
  burstConfetti();

  // Go to yes screen
  showScreen(yesScreen);

  // Autoplay YouTube (iOS may require tap sometimes)
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
});

// ---------- NO: teleport + jumpscare logic ----------
let noCount = 0;
let jumpscareArmed = false;

// After these many dodges, we arm jumpscare for the NEXT hover/click
const ARM_JUMPSCARE_AT = 5;

function moveNoButton() {
  noCount++;

  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 18;

  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;

  const x = Math.random() * maxX + padding;
  const y = Math.random() * maxY + padding;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Nice try 😅",
    "Nope 🙃",
    "You sure about that? 👀",
    "This button is shy…",
    "Okay… last warning 😈"
  ];

  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];

  if (noCount >= ARM_JUMPSCARE_AT) {
    // Tell them one last message, arm jumpscare
    hint.textContent = "Final warning… don’t touch it again 😼";
    jumpscareArmed = true;
  }
}

function resetNoButton() {
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
}

// Desktop hover
noBtn.addEventListener("mouseenter", () => {
  if (jumpscareArmed) return triggerJumpscare();
  moveNoButton();
});

// Mobile tap
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (jumpscareArmed) return triggerJumpscare();
  moveNoButton();
});

// ---------- Jumpscare ----------
function triggerJumpscare() {
  jumpscareArmed = false; // one-time
  playScaryNoise();

  jumpscare.classList.remove("hidden");
  setTimeout(() => {
    jumpscare.classList.add("hidden");
    // After scare, move the button once (extra chaos)
    moveNoButton();
  }, 650);
}

// A short scary noise using Web Audio (no external files needed)
function playScaryNoise() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    // White noise burst + quick pitch drop
    const bufferSize = audioCtx.sampleRate * 0.25;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize); // fade out
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.9;

    const osc = audioCtx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, audioCtx.currentTime + 0.18);

    const oscGain = audioCtx.createGain();
    oscGain.gain.value = 0.35;

    noise.connect(gain);
    gain.connect(audioCtx.destination);

    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);

    noise.start();
    osc.start();

    setTimeout(() => {
      noise.stop();
      osc.stop();
      audioCtx.close();
    }, 250);
  } catch {
    // If audio fails (rare), do nothing.
  }
}

// ---------- Hearts (start only after YES) ----------
function startHearts() {
  heartsLayer.classList.remove("hidden");
  if (heartsInterval) return;

  heartsInterval = setInterval(() => {
    spawnHeart();
  }, 220);
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "❤" : "💖";

  const size = 14 + Math.random() * 14;
  heart.style.fontSize = `${size}px`;
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.top = `${100 + Math.random() * 10}vh`;

  const dur = 4 + Math.random() * 3.5;
  heart.style.animationDuration = `${dur}s`;

  heartsLayer.appendChild(heart);

  setTimeout(() => heart.remove(), dur * 1000);
}

// ---------- Confetti ----------
let confettiPieces = [];
let confettiAnimating = false;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth * devicePixelRatio;
  confettiCanvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function burstConfetti() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  confettiPieces = [];
  for (let i = 0; i < 140; i++) {
    confettiPieces.push({
      x: W / 2,
      y: H / 3,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 10 - 4,
      g: 0.25 + Math.random() * 0.15,
      size: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      // Random bright-ish color
      color: `hsl(${Math.floor(Math.random() * 360)}, 90%, 65%)`
    });
  }

  if (!confettiAnimating) {
    confettiAnimating = true;
