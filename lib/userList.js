const { TodoList } = require('./todoList');

class User{
  constructor(username, password, todoList){
    this.userName = username;
    this.password = password;
    this.todoList = todoList;
  }
  
  static createUser(user){
    const { userName, password} = user;
    const todoList = TodoList.load(JSON.stringify(user.todoList));
    return new User(userName, password, todoList);
  }
}

class UserList{
  constructor(userInfo){
    this.users = userInfo;
  }

  createUser(username, password){
    const newUser = new User(username, password, TodoList.load('[]'));
    this.users.push(newUser);
  }

  getUser(username){
    return this.users.find((user) => user.userName === username);
  }

  isUserExists(username, password){
    return this.users.find((user) => user.userName === username && user.password === password);
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
