const fs = require('fs');
const { App } = require('./app');
const {Todo, TodoList} = require('./todo');
const { loadTemplate } = require('./viewTemplate');

const MIME_TYPES = require('./mimeTypes');
const STATIC_FOLDER = `${__dirname}/../public`;
const TODO_STORE_PATH = `${__dirname}/../data/todo.json`;
const STATUS_CODES = {
  NOT_FOUND: 404,
  REDIRECT: 303,
  METHOD_NOT_ALLOWED: 405,
  CREATED: 201,
  OK: 200
};

const getTodo = function(){
  if (!fs.existsSync(TODO_STORE_PATH)) {
    return '[]';
  }
  return fs.readFileSync(TODO_STORE_PATH, 'utf-8');
};

const todoList = TodoList.load(getTodo());

const addTodo = function(req, res){
  const title = req.body;
  todoList.createTodo(title);
  fs.writeFileSync(TODO_STORE_PATH, todoList.toJSON(), 'utf-8');
  res.writeHead(STATUS_CODES.CREATED);
  res.end();
};

const doesFileExists = function (path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const serveStaticPage = function (req, res, next) {
  const absolutePath = STATIC_FOLDER + req.url;
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

const notFound = function (req, res) {
  res.statusCode = STATUS_CODES.NOT_FOUND;
  res.end('Not Found');
};

const methodNotAllowed = function (req, res) {
  res.writeHead(STATUS_CODES.METHOD_NOT_ALLOWED, 'Method Not Allowed');
  res.end();
};

const serveTodoList = function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', `${todoList.toJSON().length}`);
  res.writeHead(STATUS_CODES.OK);
  res.end(todoList.toJSON());
};

const serveHomePage = function(req, res){
  const homePage = loadTemplate('index.html', {});
  res.setHeader('Content-type', 'text/html');
  res.setHeader('content-Length', `${homePage.length}`);
  res.end(homePage);
};

const app = new App();

app.use(readBody);

app.post('/todo', addTodo);
app.get(/^\/$/, serveHomePage);
app.get('', serveStaticPage);
app.get('/todoList', serveTodoList);
app.get('', notFound);
app.use(methodNotAllowed);

module.exports = { app };
