
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.getElementById('event-table-body');
    tbody.innerHTML = '';
    events.forEach(evt => {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const datetimeTd = document.createElement('td');
        const reminderTd = document.createElement('td');

        nameTd.textContent = evt.eventName;
        datetimeTd.textContent = new Date(evt.eventDateTime).toLocaleString();
        reminderTd.textContent = evt.reminderTime ? new Date(evt.reminderTime).toLocaleString() : 'None';

        tr.appendChild(nameTd);
        tr.appendChild(datetimeTd);
        tr.appendChild(reminderTd);
        tbody.appendChild(tr);
    });
}

function addEventReminder() {
    const eventName = document.getElementById('event-name').value.trim();
    const eventDateTime = document.getElementById('event-datetime').value;
    const reminderDateTime = document.getElementById('reminder-datetime').value;
    const eventFeedback = document.getElementById('event-feedback');

    if (!eventName || !eventDateTime) {
        eventFeedback.textContent = "Event name and date/time are required.";
        return;
    }

    const now = new Date().getTime();
    const evtTime = new Date(eventDateTime).getTime();

    if (evtTime <= now) {
        eventFeedback.textContent = "Invalid event date and time.";
        return;
    }

    let reminderTime = null;
    if (reminderDateTime) {
        const remTime = new Date(reminderDateTime).getTime();
        if (remTime <= now || remTime >= evtTime) {
            eventFeedback.textContent = "Invalid reminder time.";
            return;
        }
        reminderTime = reminderDateTime;
    }

    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = { eventName, eventDateTime, reminderTime };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    eventFeedback.textContent = "Event reminder added successfully.";
    document.getElementById('event-name').value = '';
    document.getElementById('event-datetime').value = '';
    document.getElementById('reminder-datetime').value = '';

    loadEvents();

    if (reminderTime) {
        const timeUntilReminder = new Date(reminderTime).getTime() - now;
        setTimeout(() => {
            alert(`Reminder: ${eventName} is coming up at ${new Date(evtTime).toLocaleString()}`);
        }, timeUntilReminder);
    }
}

// --------------------- Initialization ---------------------
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    document.getElementById('add-event-btn').addEventListener('click', addEventReminder);
});
