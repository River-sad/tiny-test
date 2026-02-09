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

const yt = document.getElementById("yt");
const YT_VIDEO_ID = "J---aiyznGQ"; // same video as before

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// Initial screen
show("landing");

// Flow
startBtn.addEventListener("click", () => show("message"));
okBtn.addEventListener("click", () => show("question"));

yesBtn.addEventListener("click", () => {
  hint.textContent = "";
  resetNoButton();
  noCount = 0;
  show("yes");

  yt.src =
    `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}`;
});

restartBtn.addEventListener("click", () => {
  yt.src = "";
  hint.textContent = "";
  resetNoButton();
  noCount = 0;
  show("question");
});

// No button movement
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

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
