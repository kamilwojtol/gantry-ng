import { Component, input, output } from '@angular/core';
import { BoardTask } from '../board-task/board-task';
import Status from '../../../types/status';
import Task from '../../../types/task';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  imports: [BoardTask, CdkDropList],
  selector: 'app-board-status',
  styleUrl: './board-status.css',
  templateUrl: './board-status.html',
})
export class BoardStatus {
  readonly status = input.required<Status>();
  readonly tasks = input.required<Task[]>();
  readonly taskDropped = output<CdkDragDrop<Task[]>>();
}
