// Select DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAllButton');

// Load tasks from localStorage on page load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
};

// Add New Task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    addTask(taskText);
    saveTasks();
    taskInput.value = '';
});

// Add Task to the List
function addTask(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    if (isCompleted) listItem.classList.add('completed');

    // Mark task as completed
    listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    // Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks();
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Clear All Tasks
clearAllButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
});

// Save Tasks to localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(item => ({
        text: item.firstChild.textContent,
        completed: item.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
