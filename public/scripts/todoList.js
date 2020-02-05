const subTaskHtml = function(subTask){
  return `
    <div class="subTask" id="${subTask.id}">
    <input type="checkbox">
    <label>${subTask.text}</label>
  </div>
  <br>`;
};

const updateTitleToHtml = function(todo){
  return `
  <h3 id=${todo.id} class="todo" onclick="renderTask()">${todo.title}</h3>
  `;
};

class TodoList{
  constructor(todoList){
    this.todoList = todoList;
  }
  
  static load(content){
    const list = JSON.parse(content);
    return new TodoList(list);
  }

  titleToHtml(){
    const reverseContent = this.todoList.slice().reverse();
    return reverseContent.map(updateTitleToHtml).join('');
  }

  tasksToHtml(id){
    const todo = this.todoList.find((todo) => todo.id == id);

    const htmlForTasks = `
    <div class="subTask">
    <input id="todo-title" type="text" placeholder = "Enter subTask..." required>
    <button id="create-button" type="button" <i class="material-icons">add</i></button>
    </div>
    `;

    const html = todo.tasks ?
      todo.tasks.map((subTask) => subTaskHtml(subTask)).join('') : '';

    return html + htmlForTasks;
  }
}
