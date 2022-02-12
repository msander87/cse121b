let toDoList = [];

class LocalStorage {
    getList() {
        toDoList = localStorage.getItem('toDo');
        toDoList = JSON.parse(toDoList);
        return toDoList;
    }
  
    saveList(todolist) {
        localStorage.setItem('toDo', JSON.stringify(todolist));
    }
  }
  
  export default LocalStorage;




