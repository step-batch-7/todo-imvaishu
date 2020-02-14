const fs = require('fs');
const express = require('express');
const app = express();

const {TodoList} = require('./todoList');
const config = require('../config');

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());

const TODO_STORE_PATH = config.DATA_STORE;
const STATUS_CODES = require('./statusCodes');

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

  res.end(todoList.toJSON());
};

const addTodo = function(req, res, next){
  const {titleText} = req.body;
  if(titleText){
    todoList.createTodo(titleText);
    sendResponse(req, res);
  }
  next();
};

const deleteTodo = function(req, res, next){
  const {todoId} = req.body;
  if(todoId){
    todoList.removeTodo(todoId);
    sendResponse(req, res);
  }
  next();
};

const addSubTask = function(req, res, next){
  const {todoId, titleText} = req.body;
  if(todoId && titleText){
    todoList.addSubTask(todoId, titleText);
    sendResponse(req, res);
  }
  next();
};

const removeSubtask = function(req, res, next){
  const {todoId, subtaskId} = req.body; 
  if(todoId && subtaskId){
    todoList.deleteTask(todoId, subtaskId);
    sendResponse(req, res);
  }
  next();
};

const updateSubtaskStatus = function(req, res, next){
  const {todoId, subtaskId, status} = req.body;
  if(todoId && subtaskId && status){
    todoList.updateTaskStatus(todoId, subtaskId, status);
    sendResponse(req, res);
  }
  next();
};

const editTitle = function(req, res, next){
  const {titleId, titleText} = req.body; 
  if(titleId && titleText){
    todoList.editTitle(titleId, titleText);
    sendResponse(req, res);
  }
  next();
};

const editSubtask = function(req, res, next){
  const {todoId, subtaskId, titleText} = req.body;
  if(todoId && subtaskId && titleText){
    todoList.editTask(todoId, subtaskId, titleText);
    sendResponse(req, res);
  }
  next();
};

app.get('/', (req, res) => res.redirect('index.html'));
app.get('/todoList', serveTodoList);
app.post('/todo', addTodo);
app.post('/subTask', addSubTask);
app.post('/deleteTodo', deleteTodo);
app.post('/deleteSubtask', removeSubtask);
app.post('/editTitle', editTitle);
app.post('/editSubtask', editSubtask);
app.post('/updateStatus', updateSubtaskStatus);

module.exports = { app };
