const screens = {
  landing: document.getElementById("landing"),
  intro: document.getElementById("intro"),
  quiz: document.getElementById("quiz"),
  wrong: document.getElementById("wrong"),
  valentine: document.getElementById("valentine"),
  yes: document.getElementById("yesScreen"),
};

const startBtn = document.getElementById("startBtn");
const beginBtn = document.getElementById("beginBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const restartBtn = document.getElementById("restartBtn");

const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const progressText = document.getElementById("progressText");

const openWrap = document.getElementById("openWrap");
const openNextBtn = document.getElementById("openNextBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noHint = document.getElementById("noHint");

const happyYT = document.getElementById("happyYT");
const cryYT = document.getElementById("cryYT");

// YouTube IDs
const HAPPY_YT = "J---aiyznGQ";
const CRY_YT = "pBUs2R9JV5M";

// Quiz data
const quiz = [
  { q: "Where did we first meet?", a: ["Genshin Impact (online)", "At a café", "At a party"], c: 0 },
  { q: "When did we first meet on Genshin?", a: ["Feb 7th", "Jan 1st", "Mar 14th"], c: 0 },
  { q: "When is our anniversary?", a: ["April 30", "February 14", "July 29"], c: 0 },
  { q: "When did we meet IRL?", a: ["July 29th", "April 30", "Feb 7th"], c: 0 },
  { q: "What was our first proper date?", a: ["Chinatown eating frog legs", "Cinema", "Picnic"], c: 0 },
  { q: "Who made the first move?", a: ["Both", "You", "Me"], c: 0 },
  { q: "When did we get a civil partnership?", a: ["April 30", "July 29", "Feb 7th"], c: 0 },
  { q: "What’s our most memorable trip or day together?", open: true },
  { q: "What is one memory with me you’ll never forget?", open: true },
  { q: "If we could go anywhere together right now, where would we go?", open: true },
];

let idx = 0;
let noCount = 0;

function show(name) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function renderQuiz() {
  const item = quiz[idx];
  progressText.textContent = `Question ${idx + 1} of ${quiz.length + 1}`;
  quizQuestion.textContent = item.q;
  quizAnswers.innerHTML = "";
  openWrap.style.display = "none";

  if (item.open) {
    openWrap.style.display = "block";
    openNextBtn.onclick = next;
    return;
  }

  item.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = ans;
    btn.onclick = () => i === item.c ? next() : wrong();
    quizAnswers.appendChild(btn);
  });
}

function next() {
  idx++;
  if (idx >= quiz.length) {
    show("valentine");
  } else {
    renderQuiz();
  }
}

function wrong() {
  cryYT.src = `https://www.youtube.com/embed/${CRY_YT}?autoplay=1`;
  show("wrong");
}

function yes() {
  happyYT.src = `https://www.youtube.com/embed/${HAPPY_YT}?autoplay=1&loop=1&playlist=${HAPPY_YT}`;
  show("yes");
}

function moveNo() {
  noCount++;
  noHint.textContent = ["Nice try 😅","Nope 🙃","You sure? 👀","This button is shy…"][Math.min(noCount-1,3)];
  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * 80 + "vw";
  noBtn.style.top = Math.random() * 80 + "vh";
}

// Wiring
startBtn.onclick = () => show("intro");
beginBtn.onclick = () => { idx = 0; show("quiz"); renderQuiz(); };
tryAgainBtn.onclick = () => { idx = 0; show("quiz"); renderQuiz(); };
yesBtn.onclick = yes;
noBtn.onmouseenter = moveNo;
restartBtn.onclick = () => location.reload();

// Init
show("landing");
