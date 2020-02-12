const selector = function(id) {
  return document.querySelector(id);
};

const transferorTitle = function(id, html){
  const element = selector(id);
  element.innerHTML = html;
};

const loadTasks = function(){
  xhrGetRequest('todoList', (responseText) => {
    const todoList = TodoList.load(responseText);
    transferorTitle('#todo-tasks', todoList.tasksToHtml());
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
  xhrPostRequest('todo', body, loadTasks);
};

const addSubTask = function(id){
  const subTaskTitle = selector(`#${id}`);
  const titleText = subTaskTitle.value;
  if(titleText === ''){
    return alert('Please Enter subTask..' );
  }
  subTaskTitle.value = '';
  const [, element] = id.split('-');
  const todoId = selector(`#${element}`).id;
  const content = JSON.stringify({todoId, titleText});
  xhrPostRequest('subTask', content, loadTasks);
};

const clearTask = function(id){
  if(!confirm('Are you sure, you want to delete?')){
    return;
  }
  const [, subtaskId, todoId] = id.split('-');
  const content = JSON.stringify({todoId, subtaskId});
  xhrPostRequest('deleteSubtask', content, loadTasks);
};

const clearTodo = function(id){ 
  if(!confirm('Are you sure, you want to delete?')){
    return;
  }
  const [, todoId] = id.split('-');
  selector('#todo-tasks').innerHTML = '';
  const body = JSON.stringify({todoId});
  xhrPostRequest('deleteTodo', body, loadTasks);
};

const updateStatus = function(id){
  const[, subtaskId, todoId] = id.split('-');
  const status = selector(`#${id}`).checked;
  const content = JSON.stringify({todoId, subtaskId, status});
  xhrPostRequest('updateStatus', content, loadTasks);
};

const editTodoTitle = function(id){
  const titleText = selector(`#${id}`).innerText;
  const [, titleId] = id.split('-');
  const content = JSON.stringify({titleId, titleText});
  xhrPostRequest('editTitle', content, loadTasks);
};

const editSubtask = function(id){
  const [, subtaskId, todoId] = id.split('-');
  const titleText = selector(`#${id}`).innerText;

  const content = JSON.stringify({todoId, subtaskId, titleText});
  xhrPostRequest('editSubtask', content, loadTasks);
};

const search = () => selector('#option').value === 'title' ? searchTitle() : searchTask();

const searchTitle = function(){
  const searchText = selector('#search-title').value;
  const [todoList] = new Array(document.querySelectorAll('.block-container'));
  todoList.forEach((todo) => {
    todo.style.display = 'none';
  });
  todoList.forEach((todo) => {
    const title = todo.children[0].innerText;
    if(title.includes(searchText)){
      todo.style.display = 'block';
    }
  });
};

const searchTask = function(){
  const searchText = selector('#search-title').value;
  const [todoList] = new Array(document.querySelectorAll('.block-container'));
  todoList.forEach((todo) => {
    todo.style.display = 'none';
  }); 
  const subTasks = new Array(document.querySelectorAll('.subTask'));
  subTasks[0].forEach((task) => {
    const title = task.innerText;
    if(title.includes(searchText)){
      task.parentElement.style.display = 'block';
    }
  });
};

window.onload = loadTasks();
