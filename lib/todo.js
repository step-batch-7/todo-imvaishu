class Todo{
  constructor(title, date, tasks){
    this.title = title;
    this.date = date;
    this.tasks = tasks;
  }
}

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
      todoList.addTodo(new Todo(todo.title, new Date(todo.date), todo.tasks));
    });
    return todoList;
  }

  toJSON(){
    return JSON.stringify(this.todoList);
  }
}

module.exports = {Todo, TodoList};
