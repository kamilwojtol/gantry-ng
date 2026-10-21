import { Component, input } from '@angular/core';
import { BoardTask } from '../board-task/board-task';
import Status from '../../../types/status';
import Task from '../../../types/task';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  imports: [BoardTask, CdkDropList],
  selector: 'app-board-status',
  styleUrl: './board-status.css',
  templateUrl: './board-status.html',
})
export class BoardStatus {
  title = input<Status>();
  tasks = input<Task[]>();

  drop(event: CdkDragDrop<Task[]>) {
    const tasks = this.tasks();
    if (tasks) {
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
    }
  }
}
