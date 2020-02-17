const fs = require('fs');
const config = require('../config');
const {UserList} = require('./userList');

const USER_STORE_PATH = config.DATA_STORE;
const STATUS_CODES = require('./statusCodes');

const findUser = function(sessions, sid){
  return sessions.find((session) => session.sid === +sid);
};

const getUserList = function(){
  if(!fs.existsSync(USER_STORE_PATH)){
    return '[]';
  }
  return fs.readFileSync(USER_STORE_PATH, 'utf-8');
};

const userList = UserList.load(getUserList());

const sendResponse = function(req, res) {
  fs.writeFileSync(USER_STORE_PATH, JSON.stringify(userList.toJSON()), 'utf-8');
  res.writeHead(STATUS_CODES.CREATED);
  res.end();
};

const getUser = function(req){
  const {session} = req.cookies;
  const {sessions} = req.app.locals;
  return findUser(sessions, session).userName;
};

const serveTodoList = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  res.json(todoList.toJSON());
};

const addTodo = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { titleText } = req.body;
  todoList.createTodo(titleText);
  sendResponse(req, res);
};

const deleteTodo = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { todoId } = req.body;
  todoList.removeTodo(todoId);
  sendResponse(req, res);
};

const addSubTask = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { todoId, titleText } = req.body;
  todoList.addSubTask(todoId, titleText);
  sendResponse(req, res);
};

const removeSubtask = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { todoId, subtaskId } = req.body;
  todoList.deleteTask(todoId, subtaskId);
  sendResponse(req, res);
};

const updateSubtaskStatus = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { todoId, subtaskId, status } = req.body;
  todoList.updateTaskStatus(todoId, subtaskId, status);
  sendResponse(req, res);
};

const editTitle = function(req, res) {
  const user = getUser(req);
  const todoList = userList.getUser(user).todoList;
  const { titleId, titleText } = req.body;
  todoList.editTitle(titleId, titleText);
  sendResponse(req, res);
};

const editSubtask = function(req, res) {
  const user = getUser(req);
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

const getId = function(){
  let id = 1;
  return function(){
    return id++;
  };
};

const generateSessionId = getId();

const generateSessions = function(sessions, userName){
  const sid = generateSessionId();
  const session = {sid, userName };
  sessions.push(session);
  return sid;
};

const showHomePage = function(req, res, next){
  const {userName, password} = req.body;
  const sessions = req.app.locals.sessions;
  if(userList.isUserExists(userName, password)){
    const id = generateSessions(sessions, userName);
    res.cookie('session', id);
    res.redirect('/homepage.html');
    return;
  }
  next();
};

const logout = function(req, res){
  res.clearCookie('session');
  res.redirect('/index.html');
};

const redirectToHome = function(req, res, next){
  const {session} = req.cookies;
  if(session){
    res.redirect('/homepage.html');
    return;
  }
  next();
};

const redirectToIndex = function(req, res, next){
  const {session} = req.cookies;
  if(session){
    next();
    return;
  }
  res.redirect('/index.html');
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
  showHomePage,
  logout,
  redirectToHome,
  redirectToIndex
};
