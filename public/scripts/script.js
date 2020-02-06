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
  xhrPostRequest('todo', titleText, 'text/plain', updatePage);
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
  const content = JSON.stringify({todoId, titleText});
  xhrPostRequest('subTask', content, 'application/json', function() {
    loadTasks(todoId);
  } );
};

const clearTask = function(){
  const task = event.target.parentElement;
  const subtaskId = task.id;
  const todo = document.querySelector('.selected');
  const todoId = todo.id;
  const content = JSON.stringify({todoId, subtaskId });

  xhrPostRequest('deleteSubtask', content, 'application/json', function() {
    loadTasks(todoId);
  });
};
