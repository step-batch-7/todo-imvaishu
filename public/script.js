const showTitle = function(){
  const todoTitle = document.querySelector('#todo-title');
  const titleText = todoTitle.value;
  if(titleText === ''){
    alert('Please Enter Title' );
  }
  todoTitle.value = '';
  const req = new XMLHttpRequest();

  req.open('POST', 'todoTitle');
  req.setRequestHeader('Content-Type', 'text/plain');

  req.send(titleText);
};
