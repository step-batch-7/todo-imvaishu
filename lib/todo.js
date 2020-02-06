class Todo{
  constructor(id, title, date, tasks){
    this.id = id;
    this.title = title;
    this.date = date;
    this.tasks = tasks;
  }

  createSubTask(taskTitle){
    const id = `subTask-${new Date().getTime()}`;
    this.tasks.push({taskTitle, id, checked: false});
  }

  removeSubtask(subtaskId){
    const index = this.tasks.findIndex((subtask) => subtask.id === subtaskId);
    return this.tasks.splice(index, 1);
  }

  updateStatus(subtaskId, status){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    subtask && (subtask.checked = status);
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
    return this.todoList.find((todo) => todo.id === todoId);
  }

  createTodo(title){
    const id = `todo-${new Date().getTime()}`;
    const date = new Date();
    this.addTodo(new Todo(id, title, date, []));
  }

  removeTask(todoId){
    const index = this.todoList.findIndex((todo) => todo.id === todoId);
    return this.todoList.splice(index, 1);
  }

  toJSON(){
    return JSON.stringify(this.todoList);
  }
}

module.exports = {TodoList};
