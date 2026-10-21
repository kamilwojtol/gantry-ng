import { Component } from '@angular/core';
import { BoardStatus } from './board-status/board-status';
import Task from '../../types/task';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  imports: [BoardStatus, MatGridList, MatGridTile, DragDropModule],
  selector: 'app-board',
  styleUrl: './board.css',
  templateUrl: './board.html',
})
export class Board {
  todoTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'To do' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'To do' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'To do' },
  ];

  inProgressTasks: Task[] = [
    { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'In progress' },
    { id: 5, title: 'Task 5', description: 'Description for Task 5', status: 'In progress' },
  ];

  doneTasks: Task[] = [
    { id: 6, title: 'Task 6', description: 'Description for Task 6', status: 'Done' },
    { id: 7, title: 'Task 7', description: 'Description for Task 7', status: 'Done' },
  ];
}
