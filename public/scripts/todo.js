const transferorTitle = function(id, html){
  const element = document.querySelector(id);
  element.innerHTML = html;
};

const loadTasks = function(id){
  xhrGetRequest('todoList', (responseText) => {
    const todoList = TodoList.load(responseText);
    transferorTitle('#todo-tasks', todoList.tasksToHtml(id));
  });
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
  if(titleText === ''){
    return alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const body = JSON.stringify({titleText});
  xhrPostRequest('todo', body, updatePage);
};

const renderTask = function(){
  const titleText = event.target;
  const title = titleText.parentElement.parentElement;
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
  if(titleText === ''){
    return alert('Please Enter subTask..' );
  }
  subTaskTitle.value = '';
  const todo = document.querySelector('.selected');
  const todoId = todo.id;

  const content = JSON.stringify({todoId, titleText});
  xhrPostRequest('subTask', content, function() {
    loadTasks(todoId);
  } );
};

const clearTask = function(){
  const task = event.target.parentElement.parentElement;
  const todo = document.querySelector('.selected');
  const content = JSON.stringify({todoId: todo.id, subtaskId: task.id});

  xhrPostRequest('deleteSubtask', content, function() {
    loadTasks(todo.id);
  });
};

const clearTodo = function(){ 
  const task = event.target.parentElement.parentElement;
  const todoId = task.id;
  
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
