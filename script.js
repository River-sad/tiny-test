const screens = {
  landing: document.getElementById("landing"),
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  yes: document.getElementById("yesScreen"),
};

const startBtn = document.getElementById("startBtn");
const beginQuizBtn = document.getElementById("beginQuizBtn");
const restartBtn = document.getElementById("restartBtn");

const progressText = document.getElementById("progressText");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");

const yt = document.getElementById("yt");
const YT_VIDEO_ID = "J---aiyznGQ"; // same as before

// 🔧 EDIT THESE ANSWERS to match your story (dates/places/etc.)
const quiz = [
  // 10 questions first
  { q: "When did we first meet? 🗓️", a: ["2021", "2022", "2023"] },
  { q: "How did we first meet? 👀", a: ["Through friends", "Online", "By coincidence"] },
  { q: "Where was our first proper hangout? 📍", a: ["A café", "A park", "A bar"] },
  { q: "What was the first thing you noticed about me? 😌", a: ["My smile", "My eyes", "My vibe"] },
  { q: "What’s our #1 comfort activity together? 🛋️", a: ["Movie night", "Food + chat", "Walks"] },
  { q: "Pick a Valentine snack 🍫", a: ["Chocolate", "Ice cream", "All of the above"] },
  { q: "If we could travel right now ✈️", a: ["Beach", "City", "Mountains"] },
  { q: "Which vibe is most ‘us’? 💞", a: ["Soft & cute", "Funny & chaotic", "Chill & cozy"] },
  { q: "What should our Valentine date include? 🍝", a: ["Good food", "A surprise", "A kiss"] },
  { q: "Final warm-up question… how much do you love me? 😳", a: ["A lot", "So much", "Infinity"] },

  // 11th question = valentine question
  { q: "Okay… last question 😌", a: ["Will you be my Valentine? 💘"], isFinal: true }
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
        // Audio ON (may still depend on browser autoplay rules, but user clicked a lot already)
        yt.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&loop=1&playlist=${YT_VIDEO_ID}`;
        return;
      }
      idx++;
      renderQuiz();
    });

    quizAnswers.appendChild(btn);
  });
}

// Flow
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
