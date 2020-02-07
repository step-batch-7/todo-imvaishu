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
  if(titleText === ''){
    return alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const body = `titleText=${titleText}`;
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
  if(titleText === ''){
    return alert('Please Enter subTask..' );
  }
  subTaskTitle.value = '';
  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const body = `todoId=${todoId}&titleText=${titleText}`;
  xhrPostRequest('subTask', body, function() {
    loadTasks(todoId);
  } );
};

const clearTask = function(){
  const task = event.target.parentElement;
  const subtaskId = task.id;
  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const body = `todoId=${todoId}&subtaskId=${subtaskId}`;
  xhrPostRequest('deleteSubtask', body, function() {
    loadTasks(todoId);
  });
};

const clearTodo = function(){ 
  const task = event.target.parentElement.parentElement;
  const todo = document.querySelector(`label ${task.id}`);
  const todoId = todo.id;
  document.querySelector('#todo-tasks').innerHTML = '';
  xhrPostRequest('deleteTodo', todoId, updatePage);
};

const updateStatus = function(){
  const checkedElement = event.target;
  const subtask = checkedElement.parentElement;
  const taskId = subtask.id;

  const todo = document.querySelector('.selected');
  const todoId = todo.id;

  let status = false;
  if(checkedElement.checked){
    status = true;
  }
  const body = `todoId=${todoId}&taskId=${taskId}&status=${status}`;
  xhrPostRequest('updateStatus', body, function(){
    loadTasks(todoId);
  });
};
