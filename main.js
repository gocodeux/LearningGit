document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearTasks = document.getElementById('clear-tasks');

    // Load tasks from localStorage
    document.addEventListener('DOMContentLoaded', loadTasks);

    // Add task event
    taskForm.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear all tasks event
    clearTasks.addEventListener('click', clearAllTasks);

    // Add Task
    function addTask(e) {
        e.preventDefault();

        // Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value));

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('X'));
        li.appendChild(deleteBtn);

        // Append to list
        taskList.appendChild(li);

        // Store in localStorage
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = '';
    }

    // Remove Task
    function removeTask(e) {
        if (e.target.tagName === 'BUTTON') {
            if (confirm('Are you sure?')) {
                e.target.parentElement.remove();

                // Remove from localStorage
                removeTaskFromLocalStorage(e.target.parentElement.textContent.slice(0, -1));
            }
        }
    }

    // Clear All Tasks
    function clearAllTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Clear from localStorage
        clearTasksFromLocalStorage();
    }

    // Store Task in localStorage
    function storeTaskInLocalStorage(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load Tasks from localStorage
    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(task));

            const deleteBtn = document.createElement('button');
            deleteBtn.appendChild(document.createTextNode('X'));
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
    }

    // Remove Task from localStorage
    function removeTaskFromLocalStorage(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function (storedTask, index) {
            if (storedTask === task) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Clear Tasks from localStorage
    function clearTasksFromLocalStorage() {
        localStorage.removeItem('tasks');
    }
});
