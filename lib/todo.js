const num = {nextIndex: 1,
  zerothIndex: 0};

class Todo{
  constructor(id, title){
    this.id = id;
    this.title = title;
    this.tasks = [];
  }

  createSubTask(taskTitle){
    const subtask = this.getId().id;
    let [, subtaskId] = subtask.split('-');
    const id = `subTask-${++subtaskId}`;

    this.tasks.push({taskTitle, id, checked: false});
  }

  getId(){
    if(this.tasks.length === num.zerothIndex){
      return {id: 'subTask-0'};
    }
    return this.tasks[this.tasks.length - num.nextIndex];
  }

  removeSubtask(subtaskId){
    const index = this.tasks.findIndex((subtask) => subtask.id === subtaskId);
    this.tasks.splice(index, num.nextIndex);
  }

  updateStatus(subtaskId, status){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    subtask && (subtask.checked = status);
  }

  updateTitle(titleText){
    this.title = titleText;
  }

  editSubtask(subtaskId, titleText){
    const subtask = this.tasks.find((subtask) => subtask.id === subtaskId);
    subtask.taskTitle = titleText;
  }
}

module.exports = {Todo};
