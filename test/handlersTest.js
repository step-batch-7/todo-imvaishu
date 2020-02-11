const request = require('supertest');

const {app} = require('../lib/handlers');

describe('POST add todo', () => {
  it('should add todo to given path', (done) => {
    request(app.serve.bind(app))

      .post('/todo')
      .send('{"titleText":"something"}')
      .expect(201, done);
  });
});

describe('POST add sub task', () => {
  it('should add sub task to given path', (done) => {
    request(app.serve.bind(app))

      .post('/subTask')
      .send('{"todoId":"todo-0","titleText":"something"}')
      .expect(201, done);
  });
});

describe('POST update subtask status', () => {
  it('should update status of particular subtask', (done) => {
    request(app.serve.bind(app))
      .post('/updateStatus')
      .send('{"todoId":"todo-0","subtaskId":"subTask-0","status":true}')
      .expect(201, done);
  });
});

describe('POST edit title', () => {
  it('should edit title of particular todo', (done) => {
    request(app.serve.bind(app))
      .post('/editTitle')
      .send('{"titleId":"todo-0","titleText":"Nothing"}')
      .expect(201, done);
  });
});

describe('POST edit subtask title', () => {
  it('should edit title of particular subtask', (done) => {
    request(app.serve.bind(app))
      .post('/editSubtask')
      .send('{"todoId":"todo-0","subtaskId":"subTask-0","titleText":"Nothing"}')
      .expect(201, done);
  });
});

describe('GET home page', () => {
  it('should get index.html / path given ', (done) => {
    request(app.serve.bind(app))

      .get('/')
      .set('Accept', '*/*')
      .expect(200)
      .expect('Content-Type', 'text/html', done)
      .expect(/<title>TODO APP<\/title>/);
  });
});

describe('GET other page', () => {
  it('should get other page css path given ', (done) => {
    request(app.serve.bind(app))

      .get('/css/style.css')
      .set('Accept', '*/*')
      .expect(200)
      .expect('Content-Type', 'text/css', done);
  });
});

describe('GET serveTodoList', () => {
  it('should get todoList /todoList path given ', (done) => {
    request(app.serve.bind(app))

      .get('/todoList')
      .set('Accept', '*/*')
      .expect(200)
      .expect('[{"id":"todo-0","title":"Nothing","tasks":[{"taskTitle":"Nothing","id":"subTask-0","checked":true}]}]')
      .expect('Content-Type', 'application/json', done);
  });
});

describe('GET Not found', () => {
  it('should get not found if wrong path given', (done) => {
    request(app.serve.bind(app))

      .get('/notfound')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('PUT Method not allowed', () => {
  it('should return method not allowed', (done) => {
    request(app.serve.bind(app))

      .put('/notfound')
      .set('Accept', '*/*')
      .expect(405, done);
  });
});

describe('POST delete subTask', () => {
  it('should delete particular subtask', (done) => {
    request(app.serve.bind(app))
      .post('/deleteSubtask')
      .send('{"todoId":"todo-0","subtaskId":"subTask-0"}')
      .expect(201, done);
  });
});

describe('POST delete todo', () => {
  it('should delete particular todo', (done) => {
    request(app.serve.bind(app))

      .post('/deleteTodo')
      .send('{"todoId":"todo-0"}')
      .expect(201, done);
  });
});
