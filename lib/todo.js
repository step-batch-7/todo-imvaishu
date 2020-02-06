class Todo{
  constructor(id, title, date, tasks){
    this.id = id;
    this.title = title;
    this.date = date;
    this.tasks = tasks;
  }

  createSubTask(taskTitle){
    const id = `subTask-${this.tasks.length}`;
    this.tasks.push({taskTitle, id, checked: false});
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
      const {id, title, date, tasks} = todo;
      todoList.addTodo(new Todo(id, title, date, tasks));
    });
    return todoList;
  }

  findTodo(todoId){
    return this.todoList.find((todo) => todo.id == todoId);
  }

  createTodo(title){
    const id = `todo-${this.todoList.length}`;
    const date = new Date();
    this.addTodo(new Todo(id, title, date, []));
  }

  toJSON(){
    return JSON.stringify(this.todoList);
  }
}

module.exports = {Todo, TodoList};
