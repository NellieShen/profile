const yearEl = document.getElementById("year");
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");
let list = JSON.parse(localStorage.getItem("list"));
const dateEl = document.querySelector("#date-picker");

if (Object.keys(list).length > 0) {
  list.forEach((task) => {
    addTodo(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

// function getYear() {
//   let dt = new Date();
//   console.log(dt);
//   yearEl.innerText = dt.getFullYear();
//   console.log(yearEl.innerText);
// }

// getYear();

// Controller
function addTodo(task) {
  let newTask = inputEl.value;

  if (task) {
    newTask = task.name;
  }

  if (newTask == "") {
    alert("Please enter a task with value!");
    return false;
  }

  const liEl = document.createElement("li");

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  let dueDate = dateEl.value;

  liEl.innerText = newTask + " " + dueDate;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fa-solid fa-square-check">
  `;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fa-solid fa-trash">
  `;
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll(".list li");
  let list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });

  localStorage.setItem("list", JSON.stringify(list));
}

// date selection view
// function getDate() {
//   var date = new Date();
//   var year = date.getFullYear();
//   var month = String(date.getMonth() + 1).padStart(2, "0");
//   var todayDate = String(date.getDate()).padStart(2, "0");
//   var datePattern = year + "-" + month + "-" + todayDate;
//   document.getElementById("date-picker").value = datePattern;
// }
