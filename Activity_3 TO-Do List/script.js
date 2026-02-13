const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];
const STORAGE_KEY = 'tasks';

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
        tasks = JSON.parse(raw) || [];
    } catch (err) {
        tasks = [];
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Toggle completed when clicking task (not button)
        li.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') return;
            toggleTaskCompleted(task.id);
        });

        // Delete task
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            deleteTask(task.id);
        });

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now().toString(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function toggleTaskCompleted(id) {
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    t.completed = !t.completed;
    saveTasks();
    renderTasks();
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

// Initialize
loadTasks();
renderTasks();
