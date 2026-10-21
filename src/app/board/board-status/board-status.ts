import { Component, input } from '@angular/core';
import { BoardTask } from '../board-task/board-task';
import Status from '../../../types/status';
import Task from '../../../types/task';

@Component({
  imports: [BoardTask],
  selector: 'app-board-status',
  styleUrl: './board-status.css',
  templateUrl: './board-status.html',
})
export class BoardStatus {
  title = input<Status>();
  tasks = input<Task[]>();
}
