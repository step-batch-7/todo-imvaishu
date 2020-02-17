const num = {nextIndex: 1,
  zerothIndex: 0,
  lastIndex: -1};

class Todo{
  constructor(id, title, tasks){
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
 
  getId(){
    if(this.tasks.length === num.zerothIndex){
      return {id: 'subTask_0'};
    }
    return this.tasks[this.tasks.length - num.nextIndex];
  }

  createSubTask(taskTitle){
    const subtask = this.getId().id;
    let [, subtaskId] = subtask.split('_');
    const id = `subTask_${++subtaskId}`;

    this.tasks.push({taskTitle, id, checked: false});
    return true;
  }

  removeSubtask(subtaskId){
    const index = this.tasks.findIndex((subtask) => subtask.id === subtaskId);
    if(index === num.lastIndex){
      return false;
    }
    this.tasks.splice(index, num.nextIndex);
    return true;
  }

  updateStatus(subtaskId, status){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    if(subtask){
      subtask.checked = status;
      return true;
    }
    return false;
  }

  updateTitle(titleText){
    this.title = titleText;
  }

  editSubtask(subtaskId, titleText){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    if(subtask){
      subtask.taskTitle = titleText;
      return true;
    }
    return false;
  }
}

module.exports = {Todo};
