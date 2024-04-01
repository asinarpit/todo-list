const slideContainer = document.querySelector(".slides-container");
const slides = document.querySelectorAll(".slide");

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.querySelector(".task-list");
const addButton = document.getElementById("addBtn");
const newTaskBtn = document.getElementById("newTaskBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

let index = 0;

document.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  deleteAllBtn.addEventListener("click", deleteAllTasks);
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  displayTasks();
});

const deleteAllTasks = () => {
  todo = [];
  saveToLocalStorage();
  displayTasks();
};

const switchSlides = () => {
  index = (index + 1) % slides.length;
  slideContainer.style.transform = `translateX(-${index * 100}%)`;

  const p = newTaskBtn.querySelector("p");
  p.classList.toggle("hidden");

  const addIcon = newTaskBtn.querySelector("span");
  addIcon.classList.toggle("transition");
};

const addTask = () => {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    todo.push({ task: newTask, disabled: false });
    saveToLocalStorage();
    taskInput.value = "";
    displayTasks();
  }
};
const removeTask = (index) => {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
};

const displayTasks = () => {
  if (todo.length === 0) {
    taskList.innerHTML = `<p style="color:gray;text-align:center">You have no tasks at the moment.<br> Start by adding one!</p>`;
  } else {
    taskList.innerHTML = "";
    todo.forEach((item, index) => {
      const task = document.createElement("li");
      task.innerHTML = `<div class="flex-row">
              <input type="checkbox" class="task-checkbox"  id="input-${index}" ${
        item.disabled ? "checked" : ""
      }/>
              <p id="todo-${index}" class="${
        item.disabled ? "disabled" : ""
      }" onClick="editTask(${index})">${item.task}</p>
            </div>
            <button class="btn" id="removeBtn">
              <i class="fa-solid fa-xmark"></i>
            </button>`;

      task.className = "task";
      task
        .querySelector(".task-checkbox")
        .addEventListener("change", () => toggleTask(index));

      const removeButton = task.querySelector("#removeBtn");
      removeButton.addEventListener("click", () => removeTask(index));
      taskList.appendChild(task);
    });
  }
};

const editTask = (index) => {
  const taskItem = document.getElementById(`todo-${index}`);
  const currentTask = todo[index].task;
  // console.log(currentTask)
  const inputField = document.createElement("input");
  inputField.classList.add("edit-task-input");
  inputField.value = currentTask;
  taskItem.replaceWith(inputField);
  inputField.focus();

  inputField.addEventListener("blur", () => {
    const updatedTask = inputField.value.trim();
    if (updatedTask) {
      todo[index].task = updatedTask;
      saveToLocalStorage();
      
    }

    displayTasks();
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todo));
};

const toggleTask = (index) => {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
};
