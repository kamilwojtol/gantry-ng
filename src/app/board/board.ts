import { Component, signal, WritableSignal } from '@angular/core';
import { BoardStatus } from './board-status/board-status';
import Status from '../../types/status';
import Task from '../../types/task';
import {
  CdkDragDrop,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  imports: [BoardStatus, CdkDropListGroup],
  selector: 'app-board',
  styleUrl: './board.css',
  templateUrl: './board.html',
})
export class Board {
  readonly todoTasks = signal<Task[]>([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'To do' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'To do' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'To do' },
  ]);

  readonly inProgressTasks = signal<Task[]>([
    { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'In progress' },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', status: 'In progress' },
  ]);

  readonly doneTasks = signal<Task[]>([
    { id: 6, title: 'Task 6', description: 'Description for Task 6', status: 'Done' },
    { id: 7, title: 'Task 7', description: 'Description for Task 7', status: 'Done' },
  ]);

  readonly columns = [
    { status: 'To do' as const, tasks: this.todoTasks },
    { status: 'In progress' as const, tasks: this.inProgressTasks },
    { status: 'Done' as const, tasks: this.doneTasks },
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      const status = event.container.id as Status;
      const tasksSignal = this.getTasksSignal(status);
      const updated = [...tasksSignal()];
      moveItemInArray(updated, event.previousIndex, event.currentIndex);
      tasksSignal.set(updated);
    } else {
      const sourceStatus = event.previousContainer.id as Status;
      const targetStatus = event.container.id as Status;

      const sourceSignal = this.getTasksSignal(sourceStatus);
      const targetSignal = this.getTasksSignal(targetStatus);

      const sourceTasks = [...sourceSignal()];
      const targetTasks = [...targetSignal()];

      transferArrayItem(sourceTasks, targetTasks, event.previousIndex, event.currentIndex);

      const movedTask = targetTasks[event.currentIndex];
      if (movedTask) {
        targetTasks[event.currentIndex] = {
          ...movedTask,
          status: targetStatus,
        };
      }

      sourceSignal.set(sourceTasks);
      targetSignal.set(targetTasks);
    }
  }

  private getTasksSignal(status: Status): WritableSignal<Task[]> {
    switch (status) {
      case 'To do':
        return this.todoTasks;
      case 'In progress':
        return this.inProgressTasks;
      case 'Done':
        return this.doneTasks;
    }
  }
}
