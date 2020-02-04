let todoList = [];

const updateToHtml = function(todo){
  return `<h3 id="todo">${todo.title}</h3>`;
};

const transferorTitle = function(){
  const element = document.querySelector('#todo-items');
  todoList = JSON.parse(todoList);
  const html = todoList.slice().reverse().map(updateToHtml).join('');
  element.innerHTML = html;
};

const updatePage = function(){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status == 200){
      todoList = this.responseText;
      transferorTitle();
    }
  };
  req.open('GET', 'todoList');
  req.send();
};

const showTitle = function(){
  const todoTitle = document.querySelector('#todo-title');
  const titleText = todoTitle.value;
  if(titleText === ''){
    alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const req = new XMLHttpRequest();

  req.onload = function(){
    if(this.status == 201){
      updatePage();
    }
  };

  req.open('POST', 'todoTitle');
  req.setRequestHeader('Content-Type', 'text/plain');

  req.send(titleText);
};
