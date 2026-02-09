const startBtn = document.getElementById("startBtn");
const startActions = document.getElementById("startActions");

const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const yesScreen = document.getElementById("yesScreen");
const restartBtn = document.getElementById("restartBtn");
const yt = document.getElementById("yt");

// Put a happy cat video here (YouTube video id). Example: "J---aiyznGQ" (Nyan Cat) – replace with your chosen one.
const YT_VIDEO_ID = "J---aiyznGQ";

let noCount = 0;

startBtn.addEventListener("click", () => {
  startActions.classList.add("hidden");
  question.classList.remove("hidden");
});

yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  yesScreen.classList.remove("hidden");

  // Autoplay YouTube (works in many browsers; iOS may require a tap)
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=0&loop=1&playlist=${YT_VIDEO_ID}`;
});

// Teleporting “No” button
function moveNoButton() {
  noCount++;

  const card = document.querySelector(".card");
  const rect = card.getBoundingClientRect();

  // Keep it inside the card area (with padding)
  const padding = 18;
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = rect.width - btnRect.width - padding;
  const maxY = rect.height - btnRect.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  const messages = [
    "Nice try 😅",
    "Nope 🙃",
    "You sure about that? 👀",
    "This button is shy…",
    "Okay… but like… why? 😂"
  ];
  hint.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
}

// On desktop: teleport on hover; on mobile: teleport on click
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

restartBtn.addEventListener("click", () => {
  yesScreen.classList.add("hidden");
  question.classList.remove("hidden");
  hint.textContent = "";
  noCount = 0;
  yt.src = "";
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
});
