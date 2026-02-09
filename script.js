const startScreen = document.getElementById("start");
const messageScreen = document.getElementById("message");
const scareScreen = document.getElementById("scare");
const startBtn = document.getElementById("startBtn");

function show(screen) {
  startScreen.classList.remove("active");
  messageScreen.classList.remove("active");
  scareScreen.classList.remove("active");
  screen.classList.add("active");
}

// ---- Loud scream sound ----
function playScream() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioContext();

    const duration = 0.35;
    const bufferSize = ac.sampleRate * duration;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ac.createBufferSource();
    noise.buffer = buffer;

    const osc = ac.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(900, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.25);

    const gain = ac.createGain();
    gain.gain.setValueAtTime(1, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

    noise.connect(gain);
    osc.connect(gain);
    gain.connect(ac.destination);

    noise.start();
    osc.start();

    noise.stop(ac.currentTime + duration);
    osc.stop(ac.currentTime + duration);

    setTimeout(() => ac.close(), 500);
  } catch (e) {}
}

// ---- FLOW ----
startBtn.addEventListener("click", () => {
  show(messageScreen);
});

messageScreen.addEventListener("click", () => {
  show(scareScreen);
  playScream();
});
