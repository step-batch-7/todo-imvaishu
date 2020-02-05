const transferorTitle = function(todoList){
  const element = document.querySelector('#todo-items');
  element.innerHTML = todoList.titleToHtml();
};

const updatePage = function(){
  const req = new XMLHttpRequest();
  req.onload = function(){
    if(this.status == 200){
      const todoList = TodoList.load(this.responseText);
      transferorTitle(todoList);
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
  req.open('POST', 'todoTitle');
  req.setRequestHeader('Content-Type', 'text/plain');
  req.send(titleText);
};

const renderTask = function(){
  const 
}
