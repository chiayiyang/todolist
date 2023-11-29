document.addEventListener("DOMContentLoaded", function () {
    const todoContainer = document.querySelector(".todolist");
    const addTaskButton = document.querySelector(".add-taskcard");

    // 按下 Add New Task 按鈕時觸發的函數
    function addNewTask() {
        const newTaskCard = document.createElement("div");
        newTaskCard.classList.add("taskcard");

        newTaskCard.innerHTML = `
            <span class="card-content">
                <div class="card-title">
                    <input type="checkbox" id="scales" name="scales" checked />
                    <label for="scales">New Content</label>
                </div>
                <span class="action-btn">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#979797" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.138.763t-.437.662L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5l-1.4 1.4l1.4 1.4Z"/></svg></button> 
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg></button>
                </span>
            </span>
        `;

        // 將新的任務卡插入到 .taskarea 區域的最上面
        const taskArea = document.querySelector('.taskarea');
        taskArea.insertBefore(newTaskCard, taskArea.firstChild);
    }

    // 點擊 Add New Task 按鈕時觸發添加新任務的函數
    addTaskButton.addEventListener("click", addNewTask);

    
});


