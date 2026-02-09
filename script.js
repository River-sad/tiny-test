const startBtn = document.getElementById("startBtn");
const landing = document.getElementById("landing");

const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const yesScreen = document.getElementById("yesScreen");
const restartBtn = document.getElementById("restartBtn");
const yt = document.getElementById("yt");

// Replace with your chosen happy cat YouTube video ID
const YT_VIDEO_ID = "J---aiyznGQ";

let noCount = 0;

// Start flow
startBtn.addEventListener("click", () => {
  landing.classList.add("hidden");
  question.classList.remove("hidden");
});

// YES button
yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  yesScreen.classList.remove("hidden");

  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
});

// NO button teleport logic
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
    "Okay… interesting choice 😂"
  ];

  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
}

// Desktop hover
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile tap
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Replay
restartBtn.addEventListener("click", () => {
  yesScreen.classList.add("hidden");
  question.classList.remove("hidden");
  yt.src = "";
  hint.textContent = "";
  noCount = 0;
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
});
