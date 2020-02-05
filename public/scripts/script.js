const transferorTitle = function(id, html){
  const element = document.querySelector(id);
  element.innerHTML = html;
};

const updatePage = function(){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status == 200){
      const todoList = TodoList.load(this.responseText);
      transferorTitle('#todo-items', todoList.titleToHtml());
    }
  };
  req.open('GET', 'todoList');
  req.send();
};

const showTitle = function(){
  const todoTitle = document.querySelector('#todo-title');
  const titleText = todoTitle.value;
  if(titleText === ''){
    return alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status == 201){
      updatePage();
    }
  };
  req.open('POST', 'todo');
  req.setRequestHeader('Content-Type', 'text/plain');
  req.send(titleText);
};

const loadTasks = function(id){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status == 200){
      const todoList = TodoList.load(this.responseText);
      transferorTitle('#todo-tasks', todoList.tasksToHtml(id));
    }
  };
  req.open('GET', 'todoList');
  req.send();
};

const renderTask = function(){
  const title = event.target;
  loadTasks(title.id);
};
