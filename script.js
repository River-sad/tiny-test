// ---- Grab elements (failsafe) ----
function mustGet(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Missing element #${id} in index.html`);
  return el;
}

const screens = {
  landing: mustGet("landing"),
  intro: mustGet("intro"),
  quiz: mustGet("quiz"),
  yes: mustGet("yesScreen"),
};

const startBtn = mustGet("startBtn");
const beginQuizBtn = mustGet("beginQuizBtn");
const restartBtn = mustGet("restartBtn");

const progressText = mustGet("progressText");
const quizQuestion = mustGet("quizQuestion");
const quizAnswers = mustGet("quizAnswers");

const yt = mustGet("yt");

// If any critical element is missing, stop early to avoid “nothing works”
if (!startBtn || !beginQuizBtn || !quizQuestion || !quizAnswers) {
  throw new Error("Fix the missing IDs shown in the console.");
}

const YT_VIDEO_ID = "J---aiyznGQ"; // your earlier video

// 10 questions + final Valentine question
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

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
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
        show("yes");
        // audio ON (browser may still require user interaction — which has happened)
        yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
      } else {
        idx++;
        renderQuiz();
      }
    });

    quizAnswers.appendChild(btn);
  });
}

// ---- Flow ----
show("landing");

startBtn.addEventListener("click", () => show("intro"));

beginQuizBtn.addEventListener("click", () => {
  idx = 0;
  yt.src = "";
  show("quiz");
  renderQuiz();
});

restartBtn.addEventListener("click", () => {
  yt.src = "";
  idx = 0;
  show("landing");
});
