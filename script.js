// If script loads, this text will change
const jsStatus = document.getElementById("jsStatus");
if (jsStatus) jsStatus.textContent = "✅ Ready";

// Elements
const landing = document.getElementById("landing");
const intro = document.getElementById("intro");
const quizEl = document.getElementById("quiz");
const yesScreen = document.getElementById("yesScreen");

const startBtn = document.getElementById("startBtn");
const beginQuizBtn = document.getElementById("beginQuizBtn");
const restartBtn = document.getElementById("restartBtn");

const progressText = document.getElementById("progressText");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");

const yt = document.getElementById("yt");

const YT_VIDEO_ID = "J---aiyznGQ";

// 10 questions + final
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
  { q: "Okay… last question 😌", a: ["Will you be my Valentine? 💘"], isFinal: true },
];

let idx = 0;

const screens = [landing, intro, quizEl, yesScreen].filter(Boolean);

function showScreen(screen) {
  // Hide all
  screens.forEach(s => {
    s.classList.add("is-hidden");
    s.classList.remove("animate-in");
  });

  // Show chosen
  screen.classList.remove("is-hidden");
  requestAnimationFrame(() => screen.classList.add("animate-in"));
}

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
      if (item.isFinal) {
        showScreen(yesScreen);
        yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
      } else {
        idx++;
        renderQuiz();
      }
    });

    quizAnswers.appendChild(btn);
  });
}

// Initial state: show landing, hide others
if (intro) intro.classList.add("is-hidden");
if (quizEl) quizEl.classList.add("is-hidden");
if (yesScreen) yesScreen.classList.add("is-hidden");
showScreen(landing);

// Buttons
startBtn?.addEventListener("click", () => showScreen(intro));

beginQuizBtn?.addEventListener("click", () => {
  idx = 0;
  yt.src = "";
  showScreen(quizEl);
  renderQuiz();
});

restartBtn?.addEventListener("click", () => {
  yt.src = "";
  idx = 0;
  showScreen(landing);
});
