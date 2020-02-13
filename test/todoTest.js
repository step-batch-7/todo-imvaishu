const assert = require('assert');
const {Todo} = require('../lib/todo'); 

describe('createSubtask', () => {
  it('should create subTask of particular todo', () => {
    const todo = new Todo('todo_0', 'something');
    const actual = todo.createSubTask('nothing');
    assert.ok(actual);
  });
});
 
describe('getId', () => {
  it('should give id as zero if there are no tasks', () => {
    const todo = new Todo('todo_0', 'something');
    const actual = todo.getId();
    const expected = {id: 'subTask_0'};
    assert.deepStrictEqual(actual, expected);
  });

  it('should give id as zero if there are no tasks', () => {
    const todo = new Todo('todo_0', 'something');
    todo.createSubTask('nothing');
    const actual = todo.getId();
    const expected = {taskTitle: 'nothing', id: 'subTask_1', checked: false};
    assert.deepStrictEqual(actual, expected);
  });
});

describe('removeSubtask', () => {
  it('should remove subtask if it is there', () => {
    const todo = new Todo('todo_0', 'something');
    todo.createSubTask('nothing');
    const actual = todo.removeSubtask('subTask_1');
    assert.ok(actual);
  });

  it('should give false if subTask is not there', () => {
    const todo = new Todo('todo_0', 'something');
    const actual = todo.removeSubtask('subTask_1');
    assert.ok(!actual);
  });
});

describe('updateStatus', () => {
  it('should update status of given subtask if it is there', () => {
    const todo = new Todo('todo_0', 'something');
    todo.createSubTask('nothing');
    const actual = todo.updateStatus('subTask_1', true);
    assert.ok(actual);
  });

  it('should give false if subTask is not there', () => {
    const todo = new Todo('todo_0', 'something');
    const actual = todo.updateStatus('subTask_1', true);
    assert.ok(!actual);
  });
});

describe('editSubtask', () => {
  it('should edit subtask title if it is there', () => {
    const todo = new Todo('todo_0', 'something');
    todo.createSubTask('nothing');
    const actual = todo.editSubtask('subTask_1', 'nothing');
    assert.ok(actual);
  });

  it('should give false if subTask is not there', () => {
    const todo = new Todo('todo_0', 'something');
    const actual = todo.editSubtask('subTask_1', 'nothing');
    assert.ok(!actual);
  });
});
