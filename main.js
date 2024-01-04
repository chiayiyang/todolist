const taskState = ["todo", "inprogress", "done"];

const todoTasks = [];
const inProgressTasks = [];
const doneTasks = [];

function updateState(index, stateIndex) {
    const buttonElement = document.getElementById(`${index}`).querySelector('.card-content > .card-title > .btn-group > .dropdown-toggle');
    const stateIcons = ["fa-battery-empty", "fa-battery-quarter", "fa-battery-half", "fa-battery-full"];

    const iconHTML = `<i class="fa-solid ${stateIcons[stateIndex]}"></i>`;

    buttonElement.innerHTML = iconHTML;

    todoTasks[index].state = taskState[stateIndex];
}

var $todoTaskArea;
var $inProgressTaskArea;
var $inDoneTaskArea;
var $todoContainer;
var $inProgressContainer;
var $doneContainer;
var $addTaskButton;

document.addEventListener("DOMContentLoaded", function () {
    $todoTaskArea = document.querySelector(".todo > .taskarea");
    $inProgressTaskArea = document.querySelector(".in-progress > .taskarea");
    $inDoneTaskArea = document.querySelector(".done > .taskarea");
    $todoContainer = document.querySelector(".todolists");
    $inProgressContainer = document.querySelector(".inprogresslists");
    $doneContainer = document.querySelector(".donelists");
    $addTaskButton = document.querySelector(".add-taskcard");

    updateToDoTaskArea();
    updateInProgressTaskArea();
    updateDoneTaskArea();
});

function addTodoTaskCardAndUpdateTaskArea() {
    todoTasks.push({
        content: "Your New Task!",
        isCheck: false
    });

    updateToDoTaskArea();
}

function addInProgressTaskCardAndUpdateTaskArea() {
    inProgressTasks.push({
        content: "Your New Task!",
        isCheck: false,
        state: taskState[1] // Set the initial state to "inprogress"
    });

    updateInProgressTaskArea();
}

function addDoneTaskCardAndUpdateTaskArea() {
    doneTasks.push({
        content: "Your New Task!",
        isCheck: false,
        state: taskState[2] // Set the initial state to "done"
    });

    updateDoneTaskArea();
}

function deleteTodoTaskCardAndUpdateTaskArea(index) {
    todoTasks.splice(index, 1);
    updateToDoTaskArea();
}

function deleteInProgressTaskCardAndUpdateTaskArea(index) {
    inProgressTasks.splice(index, 1);
    updateInProgressTaskArea();
}

function deleteDoneTaskCardAndUpdateTaskArea(index) {
    doneTasks.splice(index, 1);
    updateDoneTaskArea();
}

function updateToDoTaskArea() {
    let todoTaskCardsHTML = "";
    let i = 0;
    for (let todoTask of todoTasks) {
        let isCheck = todoTask.isCheck ? "checked" : "";
        todoTaskCardsHTML += `
            <div class="taskcard" id="${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-battery-empty"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState(${i}, ${0})"><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState(${i}, ${1})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState(${i}, ${2})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>
                        </div>
                        <label for="scales">${todoTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
                        <button onclick="deleteTodoTaskCardAndUpdateTaskArea(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                    </span>
                </span>
            </div>
        `;
        i++;
    }

    $todoTaskArea.innerHTML = `
        ${todoTaskCardsHTML}
        <!-- Add new Task -->
        <div class="add-taskcard" onclick="addTodoTaskCardAndUpdateTaskArea()">
            <span class="add-card-content">
                <div class="add-card">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></button>
                <div>Add New Task</div>
                </div>
            </span>
        </div>
    `;

    let todoNum = document.querySelector(".todo .mysub-title");
    todoNum.innerText = `TO DO (${todoTasks.length})`;
}

function updateInProgressTaskArea() {
    let inProgressTaskCardsHTML = "";
    let i = 0;
    for (let inProgressTask of inProgressTasks) {
        let isCheck = inProgressTask.isCheck ? "checked" : "";
        inProgressTaskCardsHTML += `
            <div class="taskcard" id="${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-battery-empty"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState(${i}, ${0})"><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState(${i}, ${1})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState(${i}, ${2})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>
                        </div>
                        <label for="scales">${inProgressTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
                        <button onclick="deleteInProgressTaskCardAndUpdateTaskArea(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                    </span>
                </span>
            </div>
        `;
        i++;
    }

    $inProgressTaskArea.innerHTML = `
        ${inProgressTaskCardsHTML}
        <!-- Add new Task -->
        <div class="add-taskcard" onclick="addInProgressTaskCardAndUpdateTaskArea()">
            <span class="add-card-content">
                <div class="add-card">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></button>
                <div>Add New Task</div>
                </div>
            </span>
        </div>
    `;

    let inProgressNum = document.querySelector(".in-progress .mysub-title");
    inProgressNum.innerText = `IN PROGRESS (${inProgressTasks.length})`;
}

function updateDoneTaskArea() {
    let doneTaskCardsHTML = "";
    let i = 0;
    for (let doneTask of doneTasks) {
        let isCheck = doneTask.isCheck ? "checked" : "";
        doneTaskCardsHTML += `
            <div class="taskcard" id="${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-battery-empty"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState(${i}, ${0})"><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState(${i}, ${1})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState(${i}, ${2})><button class="dropdown-item" type="button"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>
                        </div>
                        <label for="scales">${doneTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
                        <button onclick="deleteDoneTaskCardAndUpdateTaskArea(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                    </span>
                </span>
            </div>
        `;
        i++;
    }

    $inDoneTaskArea.innerHTML = `
        ${doneTaskCardsHTML}
        <!-- Add new Task -->
        <div class="add-taskcard" onclick="addDoneTaskCardAndUpdateTaskArea()">
            <span class="add-card-content">
                <div class="add-card">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></button>
                <div>Add New Task</div>
                </div>
            </span>
        </div>
    `;

    let doneNum = document.querySelector(".done .mysub-title");
    doneNum.innerText = `DONE (${doneTasks.length})`;
}


function editTaskContent(index, area) {
    let taskArea;
    switch (area) {
        case 'todo':
            taskArea = todoTasks;
            break;
        case 'inprogress':
            taskArea = inProgressTasks;
            break;
        case 'done':
            taskArea = doneTasks;
            break;
        default:
            taskArea = todoTasks;
            break;
    }

    // Get the label element
    const labelElement = document.getElementById(`${index}`).querySelector('label');

    // Create an input element
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = labelElement.textContent;

    // Replace the label with the input element
    labelElement.replaceWith(inputElement);

    // Add an event listener to handle the input change
    inputElement.addEventListener('blur', function () {
        // Save the edited content
        taskArea[index].content = inputElement.value;

        // Replace the input with a new label
        const newLabelElement = document.createElement('label');
        newLabelElement.textContent = inputElement.value;
        inputElement.replaceWith(newLabelElement);

        // Update the task area
        updateToDoTaskArea();
        updateInProgressTaskArea();
        updateDoneTaskArea();
    });

    // Focus on the input field
    inputElement.focus();
}