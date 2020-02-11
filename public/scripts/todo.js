const selector = function(id) {
  return document.querySelector(id);
};

const transferorTitle = function(id, html){
  const element = selector(id);
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
  const todoTitle = selector('#todo-title');
  const titleText = todoTitle.value;
  if(titleText === ''){
    return alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const body = JSON.stringify({titleText});
  xhrPostRequest('todo', body, updatePage);
};

const renderTask = function(id){
  const title = selector(`#${id}`);
  const elements = document.querySelectorAll('.selected');
  elements.forEach((element) => {
    element.classList.remove('selected');
  });
  title.classList.add('selected');

  loadTasks(id);
};

const addSubTask = function(){
  const subTaskTitle = selector('#subTask-title');
  const titleText = subTaskTitle.value;
  if(titleText === ''){
    return alert('Please Enter subTask..' );
  }
  subTaskTitle.value = '';
  const todoId = selector('.selected').id;

  const content = JSON.stringify({todoId, titleText});
  xhrPostRequest('subTask', content, function() {
    loadTasks(todoId);
  } );
};

const clearTask = function(id){
  
  if(!confirm('Are you sure, you want to delete?')){
    return;
  }
  const subtaskId = id.slice(6);
  const todo = selector('.selected');
  
  const content = JSON.stringify({todoId: todo.id, subtaskId});
  xhrPostRequest('deleteSubtask', content, function() {
    loadTasks(todo.id);
  });
};

const clearTodo = function(id){ 
  if(!confirm('Are you sure, you want to delete?')){
    return;
  }
  event.stopPropagation();
  const todoId = id.slice(7);
  selector('#todo-tasks').innerHTML = '';
  const body = JSON.stringify({todoId});
  xhrPostRequest('deleteTodo', body, updatePage);
};

const updateStatus = function(id){
  const subtaskId = id.slice(7);
  const todoId = selector('.selected').id;
  const status = selector(`#${id}`).checked;
  const content = JSON.stringify({todoId, subtaskId, status});

  xhrPostRequest('updateStatus', content, function() {
    loadTasks(todoId);
  });
};

const editTodoTitle = function(id){
  selector('#todo-tasks').innerHTML = '';
  const titleText = selector(`#${id}`).innerText;
  const titleId = id.slice(6);
  const content = JSON.stringify({titleId, titleText});
  xhrPostRequest('editTitle', content, updatePage);
};

const editSubtask = function(id){
  const subtaskId = id.slice(10);
  const todo = selector('.selected');
  const titleText = selector(`#${id}`).innerText;

  const content = JSON.stringify({todoId: todo.id, subtaskId, titleText});
  xhrPostRequest('editSubtask', content, function(){
    loadTasks(todo.id);
  });
};

const searchTitle = function(){
  const searchText = event.target.value;
  const [todoList] = new Array(document.querySelectorAll('.todo'));
  todoList.forEach((todo) => {
    todo.style.display = 'none';
  });
  todoList.forEach((todo) => {
    const title = todo.children[0].innerText;
    if(title.includes(searchText)){
      todo.style.display = 'flex';
    }
  });
};
