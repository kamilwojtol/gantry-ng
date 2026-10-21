import { Component, input } from '@angular/core';
import Task from '../../../types/task';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  imports: [CdkDrag],
  selector: 'app-board-task',
  styleUrl: './board-task.css',
  templateUrl: './board-task.html',
})
export class BoardTask {
  task = input<Task>();
}
