

// --------------------- Timer Feature ---------------------
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

// --------------------- Alarm Feature ---------------------
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

// --------------------- Event Reminders Feature ---------------------
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
        datetimeTd.textContent = evt.eventDateTime;
        reminderTd.textContent = evt.reminderTime ? evt.reminderTime : 'None';

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
            alert(`Reminder: ${eventName} is coming up at ${eventDateTime}`);
        }, timeUntilReminder);
    }
}

// --------------------- To-Do List Feature ---------------------
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const tbody = document.getElementById('todo-table-body');
    tbody.innerHTML = '';
    todos.forEach((task, index) => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        const dueTd = document.createElement('td');
        const priorityTd = document.createElement('td');
        const statusTd = document.createElement('td');
        const actionTd = document.createElement('td');

        nameTd.textContent = task.taskName;
        dueTd.textContent = task.dueDate ? task.dueDate : 'N/A';
        priorityTd.textContent = task.priority ? task.priority : 'N/A';
        statusTd.textContent = task.status;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = "Mark Complete";
        completeBtn.addEventListener('click', () => {
            todos[index].status = 'Complete';
            localStorage.setItem('todos', JSON.stringify(todos));
            loadTodos();
        });

        actionTd.appendChild(completeBtn);

        tr.appendChild(nameTd);
        tr.appendChild(dueTd);
        tr.appendChild(priorityTd);
        tr.appendChild(statusTd);
        tr.appendChild(actionTd);

        tbody.appendChild(tr);
    });
}

function addTodoTask() {
    const taskName = document.getElementById('todo-task').value.trim();
    const dueDate = document.getElementById('todo-due-date').value;
    const priority = document.getElementById('todo-priority').value;
    const todoFeedback = document.getElementById('todo-feedback');

    if (!taskName) {
        todoFeedback.textContent = "Task name cannot be empty.";
        return;
    }

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTask = { taskName, dueDate, priority, status: 'Incomplete' };
    todos.push(newTask);
    localStorage.setItem('todos', JSON.stringify(todos));

    todoFeedback.textContent = "Task added successfully.";
    document.getElementById('todo-task').value = '';
    document.getElementById('todo-due-date').value = '';
    document.getElementById('todo-priority').value = '';

    loadTodos();
}

// --------------------- Initialization ---------------------
document.addEventListener('DOMContentLoaded', () => {
    getWeatherInfo();
    loadEvents();
    loadTodos();

    document.getElementById('start-timer-btn').addEventListener('click', setTimer);
    document.getElementById('set-alarm-btn').addEventListener('click', setAlarm);
    document.getElementById('add-event-btn').addEventListener('click', addEventReminder);
    document.getElementById('add-todo-btn').addEventListener('click', addTodoTask);
});
