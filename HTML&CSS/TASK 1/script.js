let timerInterval;
let totalSeconds = 0;

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timerDisplay = document.getElementById("timer");

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);

function startTimer() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            return;
        }

        totalSeconds--;
        updateDisplay();
    }, 1000);

    updateDisplay();
}

function updateDisplay() {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    timerDisplay.textContent =
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    timerDisplay.textContent = "00:00:00";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
}