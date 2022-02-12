import LocalStorage from "./ls.js";
const local_storage = new LocalStorage();
const list = document.querySelector('.task-list');
let notCompletedList = [];

function counter(notCompletedList) {
    let number = notCompletedList.length;
    if (number === 0) {
        document.querySelector('.counter').textContent = 'There are no tasks';
    } else if (number === 1) {
        document.querySelector('.counter').textContent = '1 task left';
    } else if (number >= 2) {
        document.querySelector('.counter').textContent = `${number} tasks left`;
    }
}

export default class Utilities {

    displayList(todoList) {
        list.innerHTML = '';
        todoList.forEach(item => {
            const liElement = document.createElement('li');

            const checkBox = document.createElement('a');
            checkBox.setAttribute('class', 'checked');
            checkBox.setAttribute('href', 'javascript:void(0);');
            const i1 = document.createElement('i');
            i1.setAttribute('class', 'material-icons');
            checkBox.appendChild(i1);

            const p = document.createElement('p');
            p.textContent = item.content;

            if (item.completed) {
                i1.textContent = 'done';
                p.style.textDecoration = 'line-through';
            }

            const deleteBtn = document.createElement('a');
            deleteBtn.setAttribute('class', 'delete-task');
            deleteBtn.setAttribute('href', 'javascript:void(0);');
            const i2 = document.createElement('i');
            i2.setAttribute('class', 'material-icons');
            i2.textContent = 'close';
            deleteBtn.appendChild(i2);

            liElement.appendChild(checkBox);
            liElement.appendChild(p);
            liElement.appendChild(deleteBtn);
            list.appendChild(liElement);


            checkBox.addEventListener('click', function () {
                if (i1.textContent) {
                    i1.textContent = '';
                    p.style.textDecoration = 'none';
                    item.completed = false;
                } else {
                    i1.textContent = 'done';
                    p.style.textDecoration = 'line-through';
                    item.completed = true;
                }
                local_storage.saveList(todoList);
                notCompletedList = todoList.filter((item) => !item.completed);
                counter(notCompletedList);
            });


            deleteBtn.addEventListener('click', function () {
                let completeList = local_storage.getList();
                for (let i = 0; i < completeList.length; i++) {
                    if (completeList[i].id === item.id) {
                        completeList.splice(i, 1);
                        break;
                    }
                }
                local_storage.saveList(completeList);
                location.reload();
               
            });


        });
        notCompletedList = todoList.filter((item) => !item.completed);
        counter(notCompletedList);
    }

}