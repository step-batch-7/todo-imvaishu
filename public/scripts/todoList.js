const subTaskHtml = function(task, id){
  const status = task.checked ? 'checked' : '';
  return `
  <div class="subTask" id="${task.id}">
    <div class="task">
      <input type="checkbox" ${status} class="checkbox"
        onclick="updateStatus('status-${task.id}-${id}')" id="status-${task.id}-${id}"/>
      <label contentEditable="true" onblur="editSubtask('taskTitle-${task.id}-${id}')" 
        id="taskTitle-${task.id}-${id}">${task.taskTitle}</label>
    </div>
    <div>
      <a onclick="clearTask('clear-${task.id}-${id}')" id="clear-${task.id}"> <img src="images/remove.png" class="remove"/></a>
    </div>
  </div>`;
};

const updateTitleToHtml = function(todo){
  return `
  <div class="todo" id=${todo.id}>
    <div class="title-block">
      <label contentEditable="true" 
        onblur="editTodoTitle('title-${todo.id}')" id="title-${todo.id}">${todo.title}
      </label>
    </div>
    <a onclick="clearTodo('remove-${todo.id}');" id="remove-${todo.id}" > 
      <img src="images/remove.png" class="remove"/>
    </a>
  </div>
  <div class= "title-box">
      <div>
        <input class="subTask-title" id="addTask-${todo.id}" type="text" placeholder = "Your Subtask">
      </div>
      <div>
        <button onclick="addSubTask('addTask-${todo.id}');"  >
        <img src="images/add.png" class="add"/></button>
      </div>
    </div>
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

  tasksToHtml(){
    return this.todoList.map((todo) => 
      '<div class="block-container">' + updateTitleToHtml(todo) + todo.tasks.map(task => subTaskHtml(task, todo.id)).join('') + '</div>'
    ).join('');
  }
}
