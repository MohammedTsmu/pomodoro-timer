const timerElement = document.querySelector('.timer');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const tickSound = document.querySelector('#tick-sound');
const breakSound = document.querySelector('#break-sound');
const finishSound = document.querySelector('#finish-sound');

let intervalId;
let startTime;
let elapsedTime = 0;
let timeLeft = 45 * 60 * 1000; // 45 minutes in milliseconds


function updateTimer() {
  const now = Date.now();
  elapsedTime = now - startTime;
  timeLeft = Math.max(timeLeft - elapsedTime, 0);
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
  if (timeLeft <= 0) {
    clearInterval(intervalId);
    timerElement.classList.add('finished');

    playFinishSound();

    setTimeout(() => {
      setInterval
      timeLeft = 5 * 60 * 1000; // 5 minutes in milliseconds
      if (confirm('Take (' + (timeLeft/60000) + ') Minutes a break?')) {
          startTimer();
          playTickSound();
        } else {
          pauseButton.disabled = true;
          resetButton.disabled = false;
        }
    }, 10);
    resetButton.disabled = false;;
  } else {
    playTickSound();
    // startTimer;
  }
  startTime = now;
}

// Start the timer
function startTimer() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(updateTimer, 100);
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
}

// Pause the timer
function pauseTimer() {
  clearInterval(intervalId);
  elapsedTime = Date.now() - startTime;
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
  tickSound.pause();
  tickSound.currentTime = 0;
}

// Reset the timer
function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  timeLeft = 45 * 60 * 1000;
  minutesElement.textContent = '45';
  secondsElement.textContent = '00';
  timerElement.classList.remove('finished');
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  tickSound.pause();
  tickSound.currentTime = 0;
  finishSound.pause();
  finishSound.currentTime = 0;
}

// Play the tick sound
function playTickSound() {
  if (tickSound.paused) {
    tickSound.play();
  }
}

// Play the finish sound
function playFinishSound() {
  tickSound.pause();
  tickSound.currentTime = 0;
  if (finishSound.paused) {
    finishSound.play();
  }
}

// Save the timer state to localStorage before the window is closed
window.addEventListener('beforeunload', () => {
  localStorage.setItem(
    'timerState',
    JSON.stringify({
      timeLeft,
      elapsedTime,
      isRunning: !!intervalId,
    })
  );
});

// Add event listeners to the buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
