const fs = require('fs');
const { App } = require('./app');

const MIME_TYPES = require('./mimeTypes');
const STATIC_FOLDER = `${__dirname}/../public`;
const STATUS_CODES = {
  NOT_FOUND: 404,
  REDIRECT: 303,
  METHOD_NOT_ALLOWED: 400
};

const doesFileExists = function (path) {
  const stat = fs.existsSync(path) && fs.statSync(path);
  return !stat || !stat.isFile();
};

const serveStaticPage = function (req, res, next) {
  const url = req.url === '/' ? '/index.html' : req.url;
  const absolutePath = STATIC_FOLDER + url;
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

const app = new App();

app.use(readBody);

app.get('', serveStaticPage);
app.get('', notFound);
app.use(methodNotAllowed);

module.exports = { app };
