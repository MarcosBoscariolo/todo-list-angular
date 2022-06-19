import { Component, DoCheck } from '@angular/core';

import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

  setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  deleteTask(index: number): void {
    this.taskList.splice(index, 1);
  }

  deleteAllTask(): void {
    const confirm = window.confirm("Deseja deletar todas as suas tarefas?");
    if (confirm) {
      this.taskList = [];
    }
  }

  validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Tarefa vazia, deseja apagar?");
      if (confirm) {
        this.deleteTask(index);
      }
    }
  }
}
