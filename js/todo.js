
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
        dueTd.textContent = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A';
        priorityTd.textContent = task.priority ? task.priority : 'N/A';
        statusTd.textContent = task.status;

        if (task.status === 'Incomplete') {
            const completeBtn = document.createElement('button');
            completeBtn.textContent = "Mark Complete";
            completeBtn.addEventListener('click', () => {
                todos[index].status = 'Complete';
                localStorage.setItem('todos', JSON.stringify(todos));
                loadTodos();
            });
            actionTd.appendChild(completeBtn);
        } else {
            actionTd.textContent = '—';
        }

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
    loadTodos();
    document.getElementById('add-todo-btn').addEventListener('click', addTodoTask);
});
