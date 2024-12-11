
let timerInterval = null;

function setTimer() {
    const durationInput = document.getElementById('timer-duration');
    const feedback = document.getElementById('timer-feedback');
    const countdown = document.getElementById('timer-countdown');

    let duration = parseInt(durationInput.value);
    if (isNaN(duration) || duration <= 0) {
        feedback.textContent = "Invalid timer duration.";
        return;
    }

    feedback.textContent = `Timer set for ${duration} seconds.`;
    countdown.textContent = `Time remaining: ${duration} s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        duration--;
        if (duration <= 0) {
            clearInterval(timerInterval);
            countdown.textContent = "Timer complete!";
            alert("Timer is complete!");
        } else {
            countdown.textContent = `Time remaining: ${duration} s`;
        }
    }, 1000);
}

// --------------------- Initialization ---------------------
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-timer-btn').addEventListener('click', setTimer);
});
