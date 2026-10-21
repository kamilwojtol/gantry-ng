import { Component } from '@angular/core';
import { BoardStatus } from './board-status/board-status';
import Task from '../../types/task';

@Component({
  imports: [BoardStatus],
  selector: 'app-board',
  styleUrl: './board.css',
  templateUrl: './board.html',
})
export class Board {
  tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'To do' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'In progress' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'Done' },
  ];
}
