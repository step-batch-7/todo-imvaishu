const {Todo} = require('./todo');

const num = {nextIndex: 1,
  zerothIndex: 0,
  lastIndex: -1};

class TodoList{
  constructor(){
    this.todoList = [];
  }

  addTodo(todo){
    this.todoList.push(todo);
  }

  static load(content){
    const list = JSON.parse(content);
    const todoList = new TodoList();

    list.forEach(todo => {
      const {id, title, tasks} = todo;
      todoList.addTodo(new Todo(id, title, tasks));
    });
    return todoList;
  }

  findTodo(todoId){
    return this.todoList.find((todo) => todo.id === todoId);
  }

  getId(){
    if(this.todoList.length === num.zerothIndex){
      return {id: 'todo_0'};
    }
    return this.todoList[this.todoList.length - num.nextIndex];
  }

  createTodo(title){
    const todo = this.getId().id;
    let [, todoId] = todo.split('_');
    const id = `todo_${++todoId}`;
    this.addTodo(new Todo(id, title, []));
    return true;
  }

  editTitle(todoId, titleText){
    const todo = this.findTodo(todoId);
    if(todo){
      todo.updateTitle(titleText);
      return true;
    }
    return false;
  }

  removeTask(todoId){
    const index = this.todoList.findIndex((todo) => todo.id === todoId);
    if(index === num.lastIndex){
      return false;
    }
    this.todoList.splice(index, num.nextIndex);
    return true;
  } 

  toJSON(){
    return JSON.stringify(this.todoList);
  }
}
module.exports = {TodoList};
