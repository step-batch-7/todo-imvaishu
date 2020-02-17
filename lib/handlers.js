const fs = require('fs');
const config = require('../config');
const {UserList} = require('./userList');

const USER_STORE_PATH = config.DATA_STORE;
const STATUS_CODES = require('./statusCodes');

const getUser = function(){
  if(!fs.existsSync(USER_STORE_PATH)){
    return '[]';
  }
  return fs.readFileSync(USER_STORE_PATH, 'utf-8');
};

const userList = UserList.load(getUser());

const sendResponse = function(req, res) {
  fs.writeFileSync(USER_STORE_PATH, JSON.stringify(userList.toJSON()), 'utf-8');
  res.writeHead(STATUS_CODES.CREATED);
  res.end();
};

const serveTodoList = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  res.json(todoList.toJSON());
};

const addTodo = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { titleText } = req.body;
  todoList.createTodo(titleText);
  sendResponse(req, res);
};

const deleteTodo = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { todoId } = req.body;
  todoList.removeTodo(todoId);
  sendResponse(req, res);
};

const addSubTask = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { todoId, titleText } = req.body;
  todoList.addSubTask(todoId, titleText);
  sendResponse(req, res);
};

const removeSubtask = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { todoId, subtaskId } = req.body;
  todoList.deleteTask(todoId, subtaskId);
  sendResponse(req, res);
};

const updateSubtaskStatus = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { todoId, subtaskId, status } = req.body;
  todoList.updateTaskStatus(todoId, subtaskId, status);
  sendResponse(req, res);
};

const editTitle = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { titleId, titleText } = req.body;
  todoList.editTitle(titleId, titleText);
  sendResponse(req, res);
};

const editSubtask = function(req, res) {
  const {user} = req.cookies;
  const todoList = userList.getUser(user).todoList;
  const { todoId, subtaskId, titleText } = req.body;
  todoList.editTask(todoId, subtaskId, titleText);
  sendResponse(req, res);
};

const saveAndProceed = function(req, res){
  const {userName, password} = req.body;
  if(userList.isUserExists(userName)) {
    res.end('already exists');
    return;
  }
  userList.createUser(userName, password);
  fs.writeFileSync(USER_STORE_PATH, JSON.stringify(userList.toJSON()), 'utf-8');
  res.end('successfully registered');
};

const showHomePage = function(req, res, next){
  const {userName, password} = req.body;
  if(userList.isUserExists(userName, password)){
    res.cookie('user', userName);
    res.redirect('/homepage.html');
    return;
  }
  next();
};

module.exports = {
  serveTodoList,
  addTodo,
  addSubTask,
  deleteTodo,
  removeSubtask,
  editTitle,
  editSubtask,
  updateSubtaskStatus,
  saveAndProceed,
  showHomePage
};
