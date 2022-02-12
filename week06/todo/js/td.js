import Utilities from "./utilities.js";
import LocalStorage from "./ls.js";

const utilities = new Utilities();
const local_storage = new LocalStorage();

const input = document.querySelector('#new-task');
const button = document.querySelector('.add-task');
const filterAll = document.querySelector('#all');
const filterCompleted = document.querySelector('#completed');
const filterNotCompleted = document.querySelector('#not-completed');
const error = document.querySelector('.error-message');
let toDoList = [];
let completedList = [];
let notCompletedList = [];

toDoList = local_storage.getList();
if (!toDoList) {
    toDoList = [];
}
console.log(toDoList);
utilities.displayList(toDoList);

function createObj(content) {
    this.id = new Date().getTime();
    this.content = content;
    this.completed = false;
}

button.addEventListener('click', function () {
    let task = input.value;
    if (task === "" || task.trim().length === 0) {
        input.value = '';
        error.style.display = "block";
    } else {
        input.value = '';
        error.style.display = "none";
        let newObj = new createObj(task)
        toDoList.push(newObj);
        local_storage.saveList(toDoList);
        utilities.displayList(toDoList);

    }
});

filterAll.addEventListener('click', function () {
    utilities.displayList(toDoList);
});

filterCompleted.addEventListener('click', function () {
    completedList = toDoList.filter((item) => item.completed);
    utilities.displayList(completedList);
    console.log(completedList);
    document.querySelector('.counter').textContent = 'Completed tasks';
});

filterNotCompleted.addEventListener('click', function () {
    notCompletedList = toDoList.filter((item) => !item.completed);
    console.log(notCompletedList);
    utilities.displayList(notCompletedList);
});