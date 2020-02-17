const { TodoList } = require('./todoList');

class User{
  constructor(username, password, todoList){
    this.user = username;
    this.password = password;
    this.todoList = todoList;
  }
  
  static createUser(user){
    const { username, password} = user;
    const todoList = user.todoList.map((todo) => TodoList.load(todo));
    return new User(username, password, todoList);
  }
}

class UserList{
  constructor(userInfo){
    this.users = userInfo;
  }

  createUser(username, password){
    const newUser = new User(username, password, []);
    this.users.push(newUser);
  }

  getUser(username){
    return this.users.find((user) => user.username === username);
  }

  isUserExists(username, password){
    return this.users.find((user) => user.username === username && user.password === password);
  }

  static load(usersData){
    let usersInfo = JSON.parse(usersData);
    usersInfo = usersInfo.map((user) => User.createUser(user));
    return new UserList(usersInfo);
  }

  toJSON(){
    return this.users;
  }
}

module.exports = {UserList};
