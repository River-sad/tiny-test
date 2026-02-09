// status indicator
const jsStatus = document.getElementById("jsStatus");
if (jsStatus) jsStatus.textContent = "✅ Ready";

// Screens
const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const quizEl = document.getElementById("quiz");
const valentine = document.getElementById("valentine");
const yesScreen = document.getElementById("yesScreen");

const screens = [landing, intro, quizEl, valentine, yesScreen].filter(Boolean);

// Buttons / elements
const startBtn = document.getElementById("startBtn");
const beginQuizBtn = document.getElementById("beginQuizBtn");
const restartBtn = document.getElementById("restartBtn");

const progressText = document.getElementById("progressText");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

const yt = document.getElementById("yt");
const YT_VIDEO_ID = "J---aiyznGQ";

// ✅ 10 questions only (then we go to the Valentine YES/NO screen)
const quiz = [
  { q: "When did we first meet? 🗓️", a: ["2021", "2022", "2023"] },
  { q: "How did we first meet? 👀", a: ["Through friends", "Online", "By coincidence"] },
  { q: "Where was our first proper hangout? 📍", a: ["A café", "A park", "A bar"] },
  { q: "What was the first thing you noticed about me? 😌", a: ["My smile", "My eyes", "My vibe"] },
  { q: "What’s our comfort activity together? 🛋️", a: ["Movie night", "Food + chat", "Walks"] },
  { q: "Pick a Valentine snack 🍫", a: ["Chocolate", "Ice cream", "Both"] },
  { q: "If we could travel right now ✈️", a: ["Beach", "City", "Mountains"] },
  { q: "Which vibe is most ‘us’? 💞", a: ["Soft & cute", "Funny & chaotic", "Chill & cozy"] },
  { q: "What should our Valentine date include? 🍝", a: ["Good food", "A surprise", "A kiss"] },
  { q: "How much do you love me? 😳", a: ["A lot", "So much", "Infinity"] },
];

let idx = 0;
let noCount = 0;

function showScreen(screen) {
  screens.forEach(s => {
    s.classList.add("is-hidden");
    s.classList.remove("animate-in");
  });
  screen.classList.remove("is-hidden");
  requestAnimationFrame(() => screen.classList.add("animate-in"));
}

// Initial hide, then show landing
intro.classList.add("is-hidden");
quizEl.classList.add("is-hidden");
valentine.classList.add("is-hidden");
yesScreen.classList.add("is-hidden");
showScreen(landing);

// ---- Quiz rendering ----
function renderQuiz() {
  const item = quiz[idx];
  progressText.textContent = `Question ${idx + 1} of ${quiz.length}`;
  quizQuestion.textContent = item.q;
  quizAnswers.innerHTML = "";

  item.a.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = answer;

    btn.addEventListener("click", () => {
      idx++;
      if (idx >= quiz.length) {
        // After 10 questions -> show YES/NO valentine screen
        hint.textContent = "";
        resetNoButton();
        noCount = 0;
        showScreen(valentine);
      } else {
        renderQuiz();
      }
    });

    quizAnswers.appendChild(btn);
  });
}

// ---- Flow buttons ----
startBtn.addEventListener("click", () => showScreen(intro));

beginQuizBtn.addEventListener("click", () => {
  idx = 0;
  yt.src = "";
  showScreen(quizEl);
  renderQuiz();
});

// ---- Valentine YES/NO ----
yesBtn.addEventListener("click", () => {
  showScreen(yesScreen);
  yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
});

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

// ---- Replay ----
restartBtn.addEventListener("click", () => {
  yt.src = "";
  idx = 0;
  noCount = 0;
  resetNoButton();
  showScreen(landing);
});
