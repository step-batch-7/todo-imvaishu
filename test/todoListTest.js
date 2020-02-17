const assert = require('assert');
const { Todo } = require('../lib/todo');
const { TodoList } = require('../lib/todoList');
describe('findTodo', () => {
  it('should find the particular todo in the todoList', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const expected = new Todo('todo_1', 'something', []);
    const actual = todoList.findTodo('todo_1');
    assert.deepStrictEqual(actual, expected);
  });
  it('should give undefined if particular todo is not there', () => {
    const content = '[{"id":"todo_1","title":"hai","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.findTodo('todo_2');
    assert.deepStrictEqual(actual, undefined);
  });
});
describe('createTodo', () => {
  it('should add particular todo in the todoList', () => {
    const content = '[]';
    const todoList = TodoList.load(content);
    const todo = new Todo('todo_1', 'something', []);
    const actual = todoList.createTodo(todo);
    assert.ok(actual);
  });
});
describe('getId', () => {
  it('should give id as zero if there are no todo', () => {
    const todoList = new TodoList();
    const actual = todoList.getId();
    const expected = { id: 'todo_0' };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give id of last todo', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.getId();
    const expected = new Todo('todo_1', 'something', []);
    assert.deepStrictEqual(actual, expected);
  });
});
describe('editTitle', () => {
  it('should edit title of the todo if it is present in todoList', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.editTitle('todo_1', 'nothing');
    assert.ok(actual);
  });
  it('should not edit any todo title if todo is not there', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.editTitle('todo_2', 'nothing');
    assert.ok(!actual);
  });
});
describe('removeTodo', () => {
  it('should remove todo if the todo is there in todoList', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.removeTodo('todo_1');
    assert.ok(actual);
  });
  it('should not remove any todo if todo is not there', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.removeTodo('todo_2');
    assert.ok(!actual);
  });
});
describe('addSubTask', () => {
  it('should add subtask if the todo is there in todoList', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.addSubTask('todo_1', 'nothing');
    assert.ok(actual);
  });
  it('should not add any task if todo is not there', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.addSubTask('todo_2', 'nothing');
    assert.ok(!actual);
  });
});
describe('deleteTask', () => {
  it('should delete subtask if the todo is there in todoList', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.deleteTask('todo_1', 'subTask_1');
    assert.ok(actual);
  });
  it('should not delete any task if todo is not there', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.deleteTask('todo_2', 'subTask_2');
    assert.ok(!actual);
  });
});
describe('updateTaskStatus', () => {
  it('should update status of subtask if it is there in todoList', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.updateTaskStatus('todo_1', 'subTask_1', true);
    assert.ok(actual);
  });
  it('should not update any status if todo is not there', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.updateTaskStatus('todo_2', 'subTask_2', true);
    assert.ok(!actual);
  });
});
describe('editTask', () => {
  it('should edit subtask  title if todo is there in todoList', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.editTask('todo_1', 'subTask_1', 'nothing');
    assert.ok(actual);
  });
  it('should not edit subtask title if todo is not there', () => {
    const content =
      '[{"id":"todo_1","title":"something","tasks":[{"id":"subTask_1","taskTitle":"nothing","status":"false"}]}]';
    const todoList = TodoList.load(content);
    const actual = todoList.editTask('todo_2', 'subTask_2', 'nothing');
    assert.ok(!actual);
  });
});
describe('toJSON', () => {
  it('should convert to json', () => {
    const content = '[{"id":"todo_1","title":"something","tasks":[]}]';
    const expected = [new Todo('todo_1', 'something', [])];
    const todoList = TodoList.load(content);
    const actual = todoList.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});
