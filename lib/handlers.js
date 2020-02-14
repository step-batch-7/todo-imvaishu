const fs = require('fs');
const { TodoList } = require('./todoList');
const config = require('../config');

const TODO_STORE_PATH = config.DATA_STORE;
const STATUS_CODES = require('./statusCodes');

const getTodo = function() {
  if (!fs.existsSync(TODO_STORE_PATH)) {
    return '[]';
  }
  return fs.readFileSync(TODO_STORE_PATH, 'utf-8');
};

const todoList = TodoList.load(getTodo());
const sendResponse = function(req, res) {
  fs.writeFileSync(TODO_STORE_PATH, todoList.toJSON(), 'utf-8');
  res.writeHead(STATUS_CODES.CREATED);
  res.end();
};

const serveTodoList = function(req, res) {
  res.end(todoList.toJSON());
};

const addTodo = function(req, res) {
  const { titleText } = req.body;
  todoList.createTodo(titleText);
  sendResponse(req, res);
};

const deleteTodo = function(req, res) {
  const { todoId } = req.body;
  todoList.removeTodo(todoId);
  sendResponse(req, res);
};

const addSubTask = function(req, res) {
  const { todoId, titleText } = req.body;
  todoList.addSubTask(todoId, titleText);
  sendResponse(req, res);
};

const removeSubtask = function(req, res) {
  const { todoId, subtaskId } = req.body;
  todoList.deleteTask(todoId, subtaskId);
  sendResponse(req, res);
};

const updateSubtaskStatus = function(req, res) {
  const { todoId, subtaskId, status } = req.body;
  todoList.updateTaskStatus(todoId, subtaskId, status);
  sendResponse(req, res);
};

const editTitle = function(req, res) {
  const { titleId, titleText } = req.body;
  todoList.editTitle(titleId, titleText);
  sendResponse(req, res);
};

const editSubtask = function(req, res) {
  const { todoId, subtaskId, titleText } = req.body;
  todoList.editTask(todoId, subtaskId, titleText);
  sendResponse(req, res);
};

module.exports = {
  serveTodoList,
  addTodo,
  addSubTask,
  deleteTodo,
  removeSubtask,
  editTitle,
  editSubtask,
  updateSubtaskStatus
};
