document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            const span = document.createElement('span');
            span.textContent = task;
            const actions = document.createElement('div');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn', 'btn-secondary', 'btn-sm');
            editBtn.addEventListener('click', () => editTask(index));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteBtn.addEventListener('click', () => deleteTask(index));
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(span);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function editTask(index) {
        const newTask = prompt('Edit task:', tasks[index]);
        if (newTask !== null) {
            tasks[index] = newTask.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
