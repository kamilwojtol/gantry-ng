import { Component, input } from '@angular/core';
import Task from '../../../types/task';

@Component({
  imports: [],
  selector: 'app-board-task',
  styleUrl: './board-task.css',
  templateUrl: './board-task.html',
})
export class BoardTask {
  task = input<Task>();
}
