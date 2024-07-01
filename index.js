
document.addEventListener('DOMContentLoaded', (event) => {
    displayTasks();
    document.getElementById("addButton").onclick=addTask;
});

//加入任務
function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText_str = taskInput.value;
    if (taskText_str === '') {
        return;
    }
    if (taskText_str.length > 35) {
        taskText_str = insertNewlines(taskText_str, 35);
    }
    let tasks = getTasks();
    tasks.push(taskText_str);
    saveTasks(tasks);
    taskInput.value = '';
    displayTasks();
}

// 插入換行符號
function insertNewlines(str, maxLength) {
    let result = '';
    for (let i = 0; i < str.length; i += maxLength) {
        result += str.slice(i, i + maxLength) + '\n';
    }
    return result;
}

//取得當地的任務陣列
function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

//儲存任務
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//顯示任務
function displayTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let tasks = getTasks();
    tasks.forEach((task, index) => {
        let newlist = document.createElement('li');
        newlist.textContent = task;
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteTask(index);
        };
        newlist.appendChild(deleteButton);
        taskList.appendChild(newlist);
    });
}

//刪除任務
function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}
