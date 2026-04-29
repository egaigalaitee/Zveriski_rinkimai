const display = document.querySelector(".timer-clock__display");
const ring = document.querySelector(".timer-ring");

const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");
const resumeButton = document.querySelector("#resume-button");
const presetButtons = document.querySelectorAll(".timer-preset-pill");

const alarm = new Audio("Laikrodzio.mp3");

let selectedTime = 120;
let remainingTime = selectedTime;
let timer = null;
let isRunning = false;

function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const progress = remainingTime / selectedTime;
  ring.style.setProperty("--timer-progress", progress);
}

function startTimer(reset = false) {
  if (reset) {
    remainingTime = selectedTime;
  }

  clearInterval(timer);
  isRunning = true;
  ring.classList.add("is-running");

  timer = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      ring.classList.remove("is-running");

      alarm.currentTime = 0;
      alarm.play();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  ring.classList.remove("is-running");
}

function resumeTimer() {
  if (!isRunning && remainingTime > 0) {
    startTimer(false);
  }
}

function setTimer(seconds) {
  selectedTime = seconds;
  remainingTime = seconds;
  stopTimer();
  updateDisplay();

  presetButtons.forEach((button) => {
    button.classList.remove("timer-badge--active");
  });
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent;

    if (text.includes("2")) setTimer(120);
    if (text.includes("5")) setTimer(300);
    if (text.includes("10")) setTimer(600);

    button.classList.add("timer-badge--active");
  });
});

startButton.addEventListener("click", () => startTimer(true));
stopButton.addEventListener("click", stopTimer);
resumeButton.addEventListener("click", resumeTimer);

updateDisplay();
