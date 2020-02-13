const fs = require('fs');
const { App } = require('./app');
const {TodoList} = require('./todoList');
const config = require('../config');

const MIME_TYPES = require('./mimeTypes');
const STATIC_FOLDER = `${__dirname}/../public`;
const TODO_STORE_PATH = config.DATA_STORE;
const STATUS_CODES = require('./statusCodes');

const notFound = function (req, res) {
  res.statusCode = STATUS_CODES.NOT_FOUND;
  res.end('Not Found');
};

const methodNotAllowed = function (req, res) {
  res.writeHead(STATUS_CODES.METHOD_NOT_ALLOWED, 'Method Not Allowed');
  res.end();
};

const doesFileExists = function (path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const getAbsolutePath = function(url){
  const path = url === '/' ? '/index.html' : url;
  return STATIC_FOLDER + path;
};

const serveStaticPage = function (req, res, next) {
  const absolutePath = getAbsolutePath(req.url);
  if (doesFileExists(absolutePath)) {
    return next();
  }
  const content = fs.readFileSync(absolutePath);
  const [, extension] = absolutePath.match(/.*\.(.*)$/);
  res.setHeader('Content-Type', `${MIME_TYPES[extension]}`);
  res.setHeader('Content-Length', `${content.length}`);
  res.end(content);
};

const readBody = function (req, res, next) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data;
    next();
  });
};

const getTodo = function(){
  if (!fs.existsSync(TODO_STORE_PATH)) {
    return '[]';
  }
  return fs.readFileSync(TODO_STORE_PATH, 'utf-8');
};

const todoList = TodoList.load(getTodo());

const sendResponse = function(req, res){
  fs.writeFileSync(TODO_STORE_PATH, todoList.toJSON(), 'utf-8');
  res.writeHead(STATUS_CODES.CREATED);
  res.end();
};

const serveTodoList = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', `${todoList.toJSON().length}`);
  res.writeHead(STATUS_CODES.OK);
  res.end(todoList.toJSON());
};

const addTodo = function(req, res){
  const {titleText} = JSON.parse(req.body);
  todoList.createTodo(titleText);
  sendResponse(req, res);
};

const removeTodo = function(req, res){
  const {todoId} = JSON.parse(req.body);
  
  todoList.removeTask(todoId);
  sendResponse(req, res);
};

const addSubTask = function(req, res){
  const {todoId, titleText} = JSON.parse(req.body);
  const todo = todoList.findTodo(todoId);
  todo && todo.createSubTask(titleText);
  sendResponse(req, res);
};

const removeSubtask = function(req, res){
  const {todoId, subtaskId} = JSON.parse(req.body); 
  const todo = todoList.findTodo(todoId);

  todo && todo.removeSubtask(subtaskId);
  sendResponse(req, res);
};

const updateSubtaskStatus = function(req, res){
  const {todoId, subtaskId, status} = JSON.parse(req.body);
  const todo = todoList.findTodo(todoId);
  todo && todo.updateStatus(subtaskId, status);
  sendResponse(req, res);
};

const editTitle = function(req, res){
  const {titleId, titleText} = JSON.parse(req.body); 
  todoList.editTitle(titleId, titleText);
  sendResponse(req, res);
};

const editSubtask = function(req, res){
  const {todoId, subtaskId, titleText} = JSON.parse(req.body);
  const todo = todoList.findTodo(todoId);
  todo.editSubtask(subtaskId, titleText);
  sendResponse(req, res);
};

const hasFields = (...fields) => {
  return (req, res, next) => {
    if (fields.every(field => field in JSON.parse(req.body))) {
      return next();
    }
    res.statusCode = 400;
    res.end('bad Request');
  };
};

const app = new App();

app.use(readBody);

app.get('', serveStaticPage);
app.get('/todoList', serveTodoList);
app.post('/todo', hasFields('titleText'), addTodo);
app.post('/subTask', hasFields('todoId', 'titleText'), addSubTask);
app.post('/deleteTodo', hasFields('todoId'), removeTodo);
app.post('/deleteSubtask', hasFields('todoId', 'subtaskId'), removeSubtask);
app.post('/editTitle', hasFields('titleId', 'titleText'), editTitle);
app.post('/editSubtask', hasFields('todoId', 'subtaskId', 'titleText'), editSubtask);
app.post('/updateStatus', hasFields('todoId', 'subtaskId', 'status'), updateSubtaskStatus);
app.get('', notFound);
app.use(methodNotAllowed);

module.exports = { app };
