const request = require('supertest');

const {app} = require('../lib/handlers');

const config = require('../config');

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
