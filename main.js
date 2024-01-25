// 常數和陣列的定義:定義了任務狀態的常數陣列 taskState，以及三個空陣列 todoTasks、inProgressTasks 和 doneTasks，分別用來存儲不同狀態的任務。
const taskState = ["todo", "inprogress", "done"];
const todoTasks = [];
const inProgressTasks = [];
const doneTasks = [];

// DOM 元素的變數定義：定義了用於存取 DOM 元素的變數
var $todoTaskArea;
var $inProgressTaskArea;
var $inDoneTaskArea;
var $todoContainer;
var $inProgressContainer;
var $doneContainer;
var $addTaskButton;

// 當 DOM 加載完成時，執行初始化操作，包括獲取並設置 DOM 元素的變數，然後調用更新任務區域的函數。
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

// 新增、刪除、更新任務

// 新增卡片：Todo
function addTodoTaskCardAndUpdateTaskArea(task = {
    content: "Your New Task!",
    isCheck: false,
    state: taskState[0] //在這個區塊任務狀態預設為todo
}) {
    todoTasks.push(task);
    updateToDoTaskArea();
}

// 新增卡片：InProgress
function addInProgressTaskCardAndUpdateTaskArea() {
    inProgressTasks.push({
        content: "Your New Task!",
        isCheck: false,
        state: taskState[1]
    });
    updateInProgressTaskArea();
}

// 新增卡片：Done
function addDoneTaskCardAndUpdateTaskArea() {
    doneTasks.push({
        content: "Your New Task!",
        isCheck: false,
        state: taskState[2]
    });

    updateDoneTaskArea();
}

//刪除卡片
function deleteTodoTaskCardAndUpdateTaskArea(index) {
    //每個函數都接受一個參數 index，代表要刪除的任務在相應狀態陣列中的索引位置 
    // 通過索引從待辦任務陣列中刪除一個任務卡片
    todoTasks.splice(index, 1); //
    //splice 方法是 JavaScript 陣列的一個內建方法，用於修改陣列的內容。
    //index 是指要刪除的元素的起始索引位置。
    //1 是指要刪除的元素的數量。
    updateToDoTaskArea();
    //呼叫 updateToDoTaskArea 函數，更新待辦任務區域的內容，更新最新的任務狀態。
}


function deleteInProgressTaskCardAndUpdateTaskArea(index) {
    inProgressTasks.splice(index, 1);
    updateInProgressTaskArea();
}

function deleteDoneTaskCardAndUpdateTaskArea(index) {
    doneTasks.splice(index, 1);
    updateDoneTaskArea();
}

//更新卡片
function updateToDoTaskArea() {
    let todoTaskCardsHTML = "";
    let i = 0;
    for (let todoTask of todoTasks) {
        let isCheck = todoTask.isCheck ? "checked" : "";
        todoTaskCardsHTML += `
            <div class="taskcard" id="${taskState[0]}_${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-battery-quarter"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState('${taskState[0]}_${i}', 0, 0)"><button class="dropdown-item" type="button" data-state="0"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState('${taskState[0]}_${i}', 0, 1)"><button class="dropdown-item" type="button" data-state="1"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState('${taskState[0]}_${i}', 0, 2)"><button class="dropdown-item" type="button" data-state="2"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>
                        </div>
                        <label for="scales">${todoTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent('${taskState[0]}_${i}','${taskState[0]}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
                        <button onclick="deleteTodoTaskCardAndUpdateTaskArea('${taskState[0]}_${i}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
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
            <div class="taskcard" id="${taskState[1]}_${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-battery-half"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState('${taskState[1]}_${i}', 1, 0)"><button class="dropdown-item" type="button" data-state="0"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState('${taskState[1]}_${i}', 1, 1)"><button class="dropdown-item" type="button" data-state="1"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState('${taskState[1]}_${i}', 1, 2)"><button class="dropdown-item" type="button" data-state="2"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>
                        </div>
                        <label for="scales">${inProgressTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent('${taskState[1]}_${i}','${taskState[1]}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
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
            <div class="taskcard" id="${taskState[2]}_${i}">
                <span class="card-content">
                    <div class="card-title">
                        <div class="btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-battery-full"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li onclick="updateState('${taskState[2]}_${i}', 2, 0)"><button class="dropdown-item" type="button" data-state="0"><i class="fa-solid fa-battery-quarter"></i></button></li>
                                <li onclick="updateState('${taskState[2]}_${i}', 2, 1)"><button class="dropdown-item" type="button" data-state="1"><i class="fa-solid fa-battery-half"></i></button></li>
                                <li onclick="updateState('${taskState[2]}_${i}', 2, 2)"><button class="dropdown-item" type="button" data-state="2"><i class="fa-solid fa-battery-full"></i></button></li>
                            </ul>                  
                        </div>
                        <label for="scales">${doneTask.content}</label>
                    </div>
                    <span class="action-btn">
                        <button onclick="editTaskContent('${taskState[2]}_${i}','${taskState[2]}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
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


//更新卡片
// updateState(fromState, fromIdx, toState)
function updateState(id, fromState, toState) {
    // 防呆機制：如果起始狀態與目標狀態相同，則不進行移動
    if (fromState === toState) {
        return;
    }

    // 取得按鈕元素，並更新其內容以顯示新的狀態圖示
    const buttonElement = document.getElementById(`${id}`).querySelector('.card-content > .card-title > .btn-group > .dropdown-toggle');
    const stateIcons = ["fa-battery-empty", "fa-battery-quarter", "fa-battery-half", "fa-battery-full"];
    const iconHTML = `<i class="fa-solid ${stateIcons[toState]}"></i>`;
    buttonElement.innerHTML = iconHTML;

    // 宣告一個變數用於存儲任務
    var task = null;

    console.log(fromState);
    // 根據起始狀態 (fromState) 取得對應的任務區域並刪除該任務卡片
    var index = parseInt(id.split("_")[1]);
    switch (fromState) {
        case 0:
            task = todoTasks[index];
            deleteTodoTaskCardAndUpdateTaskArea(index);
            break;
        case 1:
            task = inProgressTasks[index];
            deleteInProgressTaskCardAndUpdateTaskArea(index);
            break;
        case 2:
            task = doneTasks[index];
            deleteDoneTaskCardAndUpdateTaskArea(index); 
            break;
    }

    // 根據目標狀態 (toState) 把任務卡片移動到對應的任務區域
    switch (toState) {
        case 0: // To Do
            addTodoTaskCardAndUpdateTaskArea(task);
            break;
        case 1: // In Progress
            addInProgressTaskCardAndUpdateTaskArea(task);
            break;
        case 2: // Done
            addDoneTaskCardAndUpdateTaskArea(task);
            break;
        default:
            break;
    }
}









//編輯Task Card名稱
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
        let indexNum = parseInt(index.replace(`${area}_`, "")); // replace
        taskArea[indexNum].content = inputElement.value;

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