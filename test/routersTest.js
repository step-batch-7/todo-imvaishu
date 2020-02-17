const request = require('supertest');
const { app } = require('../lib/routers');
describe('POST signup', () => {
  it('should save the new details of the user', function(done) {
    request(app)
      .post('/newUser')
      .send({ userName: 'a', password: 'a' })
      .expect(200, done);
  });
});
describe('POST showHomePage', () => {
  it('should give the homepage if the user is signed in ', function(done) {
    request(app)
      .post('/home')
      .send({ userName: 'a', password: 'a' })
      .expect(302, done);
  });
});
describe('POST add todo', () => {
  it('should add todo to given path', done => {
    request(app)
      .post('/todo')
      .set('Cookie', ['session=1'])
      .send({ titleText: 'something' })
      .expect(201, done);
  });
  it('should not add todo to given path if the fields are not valid', done => {
    request(app)
      .post('/todo')
      .set('Cookie', ['session=1'])
      .send({ title: 'something' })
      .expect(400, done);
  });
});
describe('POST add sub task', () => {
  it('should add sub task to given path', done => {
    request(app)
      .post('/subTask')
      .set('Cookie', ['session=1'])
      .send({ todoId: 'todo_1', titleText: 'something' })
      .expect(201, done);
  });
  it('should not add sub task to given path if the fields are not valid', done => {
    request(app)
      .post('/subTask')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1', titleText: 'something' })
      .expect(400, done);
  });
});
describe('POST update subtask status', () => {
  it('should update status of particular subtask', done => {
    request(app)
      .post('/updateStatus')
      .set('Cookie', ['session=1'])
      .send({ todoId: 'todo_1', subtaskId: 'subTask_0', status: true })
      .expect(201, done);
  });
  it('should not update status of particular subtask if the fields are not valid', done => {
    request(app)
      .post('/updateStatus')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1', subtaskId: 'subTask_0', sta: true })
      .expect(400, done);
  });
});
describe('POST edit title', () => {
  it('should edit title of particular todo', done => {
    request(app)
      .post('/editTitle')
      .set('Cookie', ['session=1'])
      .send({ titleId: 'todo_1', titleText: 'Nothing' })
      .expect(201, done);
  });
  it('should not edit title of particular todo if the fields are not valid', done => {
    request(app)
      .post('/editTitle')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1', title: 'Nothing' })
      .expect(400, done);
  });
});
describe('POST edit subtask title', () => {
  it('should edit title of particular subtask', done => {
    request(app)
      .post('/editSubtask')
      .set('Cookie', ['session=1'])
      .send({ todoId: 'todo_1', subtaskId: 'subTask_1', titleText: 'Nothing' })
      .expect(201, done);
  });
  it('should not edit title of particular subtask if the fields are not valid', done => {
    request(app)
      .post('/editSubtask')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1', subtaskId: 'subTask_1', title: 'Nothing' })
      .expect(400, done);
  });
});
describe('GET home page', () => {
  it('should get homepage for /homepage.html path given ', done => {
    request(app)
      .get('/homepage.html')
      .set('Accept', '*/*')
      .set('Cookie', ['session=1'])
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8', done)
      .expect(/<title>TODO APP<\/title>/);
  });
});
describe('GET other page', () => {
  it('should get other page css path given ', done => {
    request(app)
      .get('/css/style.css')
      .set('Accept', '*/*')
      .set('Cookie', ['session=1'])
      .expect(200)
      .expect('Content-Type', 'text/css; charset=UTF-8', done);
  });
});
describe('GET Not found', () => {
  it('should get not found if wrong path given', done => {
    request(app)
      .get('/notfound')
      .set('Accept', '*/*')
      .set('Cookie', ['session=1'])
      .expect(404, done);
  });
});
describe('PUT Method not allowed', () => {
  it('should return method not allowed', done => {
    request(app)
      .put('/notfound')
      .set('Accept', '*/*')
      .set('Cookie', ['session=1'])
      .expect(404, done);
  });
});
describe('GET serveTodoList', () => {
  it('should get todoList /todoList path given ', done => {
    request(app)
      .get('/todoList')
      .set('Accept', '*/*')
      .set('Cookie', ['session=1'])
      .expect(200)
      .expect(
        '[{"id":"todo_1","title":"Nothing","tasks":[{"taskTitle":"Nothing","id":"subTask_1","checked":false}]}]',
        done
      );
  });
});
describe('POST delete subTask', () => {
  it('should delete particular subtask', done => {
    request(app)
      .post('/deleteSubtask')
      .set('Cookie', ['session=1'])
      .send({ todoId: 'todo_1', subtaskId: 'subTask_1' })
      .expect(201, done);
  });
  it('should delete particular subtask if the fields are not valid', done => {
    request(app)
      .post('/deleteSubtask')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1', subtask: 'subTask_1' })
      .expect(400, done);
  });
});
describe('POST delete todo', () => {
  it('should delete particular todo', done => {
    request(app)
      .post('/deleteTodo')
      .set('Cookie', ['session=1'])
      .send({ todoId: 'todo_1' })
      .expect(201, done);
  });
  it('should not delete particular todo if the fields are not valid', done => {
    request(app)
      .post('/deleteTodo')
      .set('Cookie', ['session=1'])
      .send({ id: 'todo_1' })
      .expect(400, done);
  });
});
