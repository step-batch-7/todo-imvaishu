const num = {nextIndex: 1,
  zerothIndex: 0,
  lastIndex: -1};

class User{
  constructor(id, userName, password){
    this.id = id;
    this.userName = userName;
    this.password = password;
  }
}

class UserList{
  constructor(){
    this.userList = [];
  }

  addUser(user){
    this.userList.push(user);
  }

  getId(){
    if(this.userList.length === num.zerothIndex){
      return {id: 'user_0'};
    }
    return this.userList[this.userList.length - num.nextIndex];
  }

  static load(content){
    const list = JSON.parse(content);
    const userList = new UserList();

    list.forEach(user => {
      const {id, userName, password} = user;
      userList.addUser(new User(id, userName, password));
    });
    return userList;
  }

  createUser(userName, password){
    const user = this.getId().id;
    let [, userId] = user.split('_');
    const id = `user_${++userId}`;
    this.addUser(new User(id, userName, password));
    return true;
  }

  toJSON(){
    return JSON.stringify(this.userList);
  }
}

module.exports = { UserList};
