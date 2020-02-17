const express = require('express');
const cookie = require('cookie-parser');
const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());

const {
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
  logout
} = require('./handlers');

const hasFields = (...parameters) => {
  return function(req, res, next) {
    if (parameters.every(param => param in req.body)) {
      return next();
    }
    res.statusCode = 400;
    res.end('Bad Request');
  };
};

app.post('/home', hasFields('userName', 'password'), showHomePage);
app.get('/todoList', serveTodoList);
app.post('/todo', hasFields('titleText'), addTodo);
app.post('/subTask', hasFields('todoId', 'titleText'), addSubTask);
app.post('/deleteTodo', hasFields('todoId'), deleteTodo);
app.post('/deleteSubtask', hasFields('todoId', 'subtaskId'), removeSubtask);
app.post('/editTitle', hasFields('titleId', 'titleText'), editTitle);
app.post('/editSubtask', hasFields('todoId', 'subtaskId', 'titleText'), editSubtask);
app.post('/updateStatus', hasFields('todoId', 'subtaskId', 'status'), updateSubtaskStatus);
app.get('/logout', logout);
app.post('/newUser', hasFields('userName', 'password'), saveAndProceed);
module.exports = { app };
