const subTaskHtml = function(task){
  const status = task.checked ? 'checked' : '';
  return `
  <div class="subTask" id="${task.id}">
    <div class="task">
      <input type="checkbox" ${status} class="checkbox"
        onclick="updateStatus('status-${task.id}')" id="status-${task.id}"/>
      <label contentEditable="true" onblur="editSubtask('taskTitle-${task.id}')" 
        id="taskTitle-${task.id}">${task.taskTitle}</label>
    </div>
    <div>
      <a onclick="clearTask('clear-${task.id}')" id="clear-${task.id}"> <img src="images/remove.png" class="remove"/></a>
    </div>
  </div>`;
};

const updateTitleToHtml = function(todo){
  return `
  <div class="todo" onclick="renderTask('${todo.id}')" id=${todo.id} >
    <div class="title-block">
      <label contentEditable="true" 
        onblur="editTodoTitle('title-${todo.id}')" id="title-${todo.id}">${todo.title}
      </label>
    </div>
    <a onclick="clearTodo('remove-${todo.id}');" id="remove-${todo.id}" > 
      <img src="images/remove.png" class="remove"/>
    </a>
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
        <button onclick="addSubTask();" id="create-button" >
        <img src="images/add.png" class="add"/></button>
      </div>
    </div>
    `;
    const html = todo.tasks ? todo.tasks.map((task) => subTaskHtml(task)).join('') : '';

    return htmlForTasks + html;
  }
}
