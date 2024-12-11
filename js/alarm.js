
let alarmTimeout = null;

function setAlarm() {
    const alarmTime = document.getElementById('alarm-time').value;
    const alarmMessage = document.getElementById('alarm-message').value;
    const alarmFeedback = document.getElementById('alarm-feedback');

    if (!alarmTime) {
        alarmFeedback.textContent = "Invalid alarm time.";
        return;
    }

    const now = new Date();
    const alarmDate = new Date();
    const [hours, minutes] = alarmTime.split(':').map(x => parseInt(x));
    alarmDate.setHours(hours, minutes, 0, 0);

    if (alarmDate <= now) {
        alarmFeedback.textContent = "Invalid alarm time (in the past).";
        return;
    }

    const timeDiff = alarmDate.getTime() - now.getTime();

    alarmFeedback.textContent = `Alarm set for ${alarmTime}.`;
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }

    alarmTimeout = setTimeout(() => {
        alert(alarmMessage ? `Alarm: ${alarmMessage}` : "Alarm ringing!");
    }, timeDiff);
}

// --------------------- Initialization ---------------------
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('set-alarm-btn').addEventListener('click', setAlarm);
});
