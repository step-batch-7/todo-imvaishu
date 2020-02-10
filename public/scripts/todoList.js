const subTaskHtml = function(task){
  const status = task.checked ? 'checked' : '';
  return `
  <div class="subTask" id="${task.id}">
    <div class="task"><input type="checkbox" ${status} id="checkbox"
    onclick="updateStatus()"><label>${task.taskTitle}</label></div>
   <div> <a id="clear-button" onclick="clearTask()" 
    <i class="material-icons">clear</i></a></div>
  </div>`;
};

const updateTitleToHtml = function(todo){
  return `
  <div class="todo" onclick="renderTask()" id=${todo.id} >
  <div class="title-block">
  <label contentEditable="true" 
  onblur="editTodoTitle()">${todo.title}</label></div>
  <a onclick="clearTodo();" id="delete-button" > 
    <i class="material-icons">remove</i></a>
  </div>`;
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
    const todo = this.todoList.find((todo) => todo.id === id);

    const htmlForTasks = `
    <div class= "title-box">
      <div>
        <input id="subTask-title" type="text" placeholder = "Your Subtask">
      </div>
      <div>
        <button onclick="addSubTask();" id="create-button" 
        <i class="material-icons">add</i></button>
      </div>
    </div>
    `;

    const html = todo.tasks ?
      todo.tasks.map((task) => subTaskHtml(task)).join('') : '';

    return htmlForTasks + html;
  }
}
