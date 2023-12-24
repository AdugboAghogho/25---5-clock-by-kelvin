let breakIncrementButton = document.getElementById("break-increment");
let breakDecrementButton = document.getElementById("break-decrement");
let sessionIncrementButton = document.getElementById("session-increment");
let sessionDecrementButton = document.getElementById("session-decrement");
let startStopButton = document.getElementById("start_stop");
let resetButton = document.getElementById("reset");

let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let timerLabel = document.getElementById("timer-label");

let timer;
let timerStatus = "stopped"; // Timer status: stopped, counting, paused
let currentTimer = "session"; // Current timer: session, break

breakIncrementButton.addEventListener("click", () => {
  let length = parseInt(breakLength.innerText);
  if (length < 60) {
    length++;
    breakLength.innerText = length;
    if (currentTimer === "break") {
      timeLeft.innerText = length + ":00"; // Update time left to new break length
    }
  }
});

breakDecrementButton.addEventListener("click", () => {
  let length = parseInt(breakLength.innerText);
  if (length > 1) {
    length--;
    breakLength.innerText = length;
    if (currentTimer === "break") {
      timeLeft.innerText = length + ":00"; // Update time left to new break length
    }
  }
});

sessionIncrementButton.addEventListener("click", () => {
  let length = parseInt(sessionLength.innerText);
  if (length < 60) {
    length++;
    sessionLength.innerText = length;
    if (currentTimer === "session") {
      timeLeft.innerText = length + ":00"; // Update time left to new session length
    }
  }
});

sessionDecrementButton.addEventListener("click", () => {
  let length = parseInt(sessionLength.innerText);
  if (length > 1) {
    length--;
    sessionLength.innerText = length;
    if (currentTimer === "session") {
      timeLeft.innerText = length + ":00"; // Update time left to new session length
    }
  }
});

startStopButton.addEventListener("click", () => {
  if (timerStatus === "counting") {
    // Pause the timer
    clearInterval(timer);
    timerStatus = "paused";
  } else if (timerStatus === "paused" || timerStatus === "stopped") {
    // Start the timer
    timer = setInterval(() => {
      timeLeft.innerText = decrementTime(timeLeft.innerText);
    }, 1000);
    timerStatus = "counting";
  }
});

resetButton.addEventListener("click", () => {
  // Stop the timer
  clearInterval(timer);
  timerStatus = "stopped";

  // Reset break length and session length
  breakLength.innerText = "5";
  sessionLength.innerText = "25";
  timeLeft.innerText = "25:00";
  timerLabel.innerText = "Session";

  currentTimer = "session";
});

function decrementTime(timeString) {
  let timeDisplay = timeString.split(":");
  let minutes = parseInt(timeDisplay[0]);
  let seconds = parseInt(timeDisplay[1]);

  if (minutes === 0 && seconds === 0) {
    // Timer is finished, switch to break or session timer
    clearInterval(timer);
    timerStatus = "stopped";

    if (currentTimer === "session") {
      let breakTime = parseInt(breakLength.innerText);
      timeLeft.innerText = breakTime + ":00";
      timerLabel.innerText = "Break";
      currentTimer = "break";
    } else if (currentTimer === "break") {
      let sessionTime = parseInt(sessionLength.innerText);
      timeLeft.innerText = sessionTime + ":00";
      timerLabel.innerText = "Session";
      currentTimer = "session";
    }

    startStopButton.click(); // Start the new timer automatically
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  // Pad single-digit seconds with leading zero
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}
