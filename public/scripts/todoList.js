const updateTitleToHtml = function(todo){
  return `<h3 id="todo" onclick="renderTask()">${todo.title}</h3>`;
};

class TodoList{
  constructor(todoList){
    this.todoList = todoList;
  }
  
  static load(content){
    const list = JSON.parse(content);
    return new TodoList(list);
  }

  titleToHtml(){
    const reverseContent = this.todoList.slice().reverse();
    return reverseContent.map(updateTitleToHtml).join('');
  }
}
