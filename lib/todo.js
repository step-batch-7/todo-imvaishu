const num = {nextIndex: 1};

class Todo{
  constructor(id, title){
    this.id = id;
    this.title = title;
    this.tasks = [];
  }

  createSubTask(taskTitle){
    const id = `subTask-${this.tasks.length * 3}`;
    this.tasks.push({taskTitle, id, checked: false});
  }

  removeSubtask(subtaskId){
    const index = this.tasks.findIndex((subtask) => subtask.id === subtaskId);
    this.tasks.splice(index, num.nextIndex);
  }

  updateStatus(subtaskId, status){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    subtask && (subtask.checked = status);
  }

  updateTitle(titleText){
    this.title = titleText;
  }

  editSubtask(subtaskId, titleText){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    subtask.taskTitle = titleText;
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
      const {id, title, tasks} = todo;
      todoList.addTodo(new Todo(id, title, tasks));
    });
    return todoList;
  }

  findTodo(todoId){
    return this.todoList.find((todo) => todo.id === todoId);
  }

  createTodo(title){
    const id = `todo-${this.todoList.length * 3}`;
    this.addTodo(new Todo(id, title, []));
  }

  removeTask(todoId){
    const index = this.todoList.findIndex((todo) => todo.id === todoId);
    this.todoList.splice(index, num.nextIndex);
  }

  editTitle(todoId, titleText){
    const todo = this.findTodo(todoId);
    todo.updateTitle(titleText);
  }

  toJSON(){
    return JSON.stringify(this.todoList);
  }
}

module.exports = {Todo, TodoList};
