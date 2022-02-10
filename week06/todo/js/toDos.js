const list = document.querySelector('.task-list');
const input = document.querySelector('#new-task');
const button = document.querySelector('.add-task');
const error = document.querySelector('.error-message');
const todo = [];

counter();


function Item(content) {
  this.id = new Date().getTime();
  this.content = content;
  this.completed = false;
}

button.addEventListener('click', function () {
  let task = input.value;
  let newItem = new Item(task);
  todo.push(newItem);
  alert(JSON.stringify(todo));

});

function displayList() {
  
  let task = input.value;
  if (task === "" || task.trim().length === 0) {
    error.style.display = "block";
  } else {
    input.value = '';
    error.style.display = "none";

    const liElement = document.createElement('li');

    const checkBox = document.createElement('a');
    checkBox.setAttribute('class', 'checked');
    checkBox.setAttribute('href', 'javascript:void(0);');
    const i1 = document.createElement('i');
    i1.setAttribute('class', 'material-icons');
    checkBox.appendChild(i1);

    const p = document.createElement('p');
    p.textContent = task;

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
      if (i1.textContent){
        i1.textContent = '';
        p.style.textDecoration = 'none';
      }
      else{        
        i1.textContent = 'done';
        p.style.textDecoration = 'line-through';
      }
      
    });

    deleteBtn.addEventListener('click', function () {
      list.removeChild(liElement);
      counter();
    });

    counter();
  }
}

function counter(){
  let number = list.children.length;
  if(number === 0){ 
    document.querySelector('.counter').textContent = 'There are no tasks';   
  }
  else if(number === 1){
    document.querySelector('.counter').textContent = '1 task left';
  }
  else if(number >= 2){
    document.querySelector('.counter').textContent = `${number} tasks left`;
  }
}