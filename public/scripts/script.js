const transferorTitle = function(id, html){
  const element = document.querySelector(id);
  element.innerHTML = html;
};

const updatePage = function(){
  xhrGetRequest('todoList', (responseText) => {
    const todoList = TodoList.load(responseText);
    transferorTitle('#todo-items', todoList.titleToHtml());
  });
};

const showTitle = function(){
  const todoTitle = document.querySelector('#todo-title');
  const titleText = todoTitle.value;
  
  todoTitle.value = '';
  const body = JSON.stringify(titleText);
  xhrPostRequest('todo', body, updatePage);
};

const loadTasks = function(id){
  xhrGetRequest('todoList', (responseText) => {
    const todoList = TodoList.load(responseText);
    transferorTitle('#todo-tasks', todoList.tasksToHtml(id));
  });
};

const renderTask = function(){
  const title = event.target;
  const elements = document.querySelectorAll('.selected');
  elements.forEach((element) => {
    element.classList.remove('selected');
  });
  title.classList.add('selected');
  loadTasks(title.id);
};

const addSubTask = function(){
  const subTaskTitle = document.querySelector('#subTask-title');
  const titleText = subTaskTitle.value;
  subTaskTitle.value = '';
  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const content = JSON.stringify({todoId, titleText});
  xhrPostRequest('subTask', content, function() {
    loadTasks(todoId);
  } );
};

const clearTask = function(){
  const task = event.target.parentElement;
  const subtaskId = task.id;
  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const content = JSON.stringify({todoId, subtaskId });

  xhrPostRequest('deleteSubtask', content, function() {
    loadTasks(todoId);
  });
};

const clearTodo = function(){ 
  const task = event.target.parentElement.parentElement;
  const todo = document.querySelector(`label ${task.id}`);
  const todoId = todo.id;
  document.querySelector('#todo-tasks').innerHTML = '';
  const body = JSON.stringify({todoId});
  xhrPostRequest('deleteTodo', body, updatePage);
};

const updateStatus = function(){
  const checkedElement = event.target;
  const subtask = checkedElement.parentElement.parentElement;
  const subtaskId = subtask.id;

  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const status = checkedElement.checked;
  const content = JSON.stringify({todoId, subtaskId, status});

  xhrPostRequest('updateStatus', content, function() {
    loadTasks(todoId);
  });
};
