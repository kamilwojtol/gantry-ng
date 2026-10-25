import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Board } from './board';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import Task from '../../types/task';

describe('Board', () => {
  let component: Board;
  let fixture: ComponentFixture<Board>;

  const mockDropEvent = (params: {
    previousContainerId: string;
    containerId: string;
    previousIndex: number;
    currentIndex: number;
  }): CdkDragDrop<Task[]> => {
    const isSame = params.previousContainerId === params.containerId;
    const prevData =
      params.previousContainerId === 'To do'
        ? component.todoTasks()
        : params.previousContainerId === 'In progress'
          ? component.inProgressTasks()
          : component.doneTasks();

    const currData =
      params.containerId === 'To do'
        ? component.todoTasks()
        : params.containerId === 'In progress'
          ? component.inProgressTasks()
          : component.doneTasks();

    const prevContainer = { id: params.previousContainerId, data: prevData } as any;
    const container = isSame ? prevContainer : ({ id: params.containerId, data: currData } as any);

    return {
      previousIndex: params.previousIndex,
      currentIndex: params.currentIndex,
      item: { data: prevData[params.previousIndex] } as any,
      container,
      previousContainer: prevContainer,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: new MouseEvent('drop'),
    };
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Board],
    }).compileComponents();

    fixture = TestBed.createComponent(Board);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default tasks in all columns', () => {
    expect(component.todoTasks().length).toBe(3);
    expect(component.inProgressTasks().length).toBe(2);
    expect(component.doneTasks().length).toBe(2);
  });

  it('should reorder tasks within the same column', () => {
    const firstTask = component.todoTasks()[0];
    const secondTask = component.todoTasks()[1];

    const dropEvent = mockDropEvent({
      previousContainerId: 'To do',
      containerId: 'To do',
      previousIndex: 0,
      currentIndex: 1,
    });

    component.drop(dropEvent);

    expect(component.todoTasks()[0].id).toBe(secondTask.id);
    expect(component.todoTasks()[1].id).toBe(firstTask.id);
    expect(component.todoTasks().length).toBe(3);
  });

  it('should transfer a task to another column and update its status', () => {
    const taskToMove = component.todoTasks()[0];

    const dropEvent = mockDropEvent({
      previousContainerId: 'To do',
      containerId: 'In progress',
      previousIndex: 0,
      currentIndex: 0,
    });

    component.drop(dropEvent);

    // Source list should have 1 fewer item
    expect(component.todoTasks().length).toBe(2);
    expect(component.todoTasks().some((t) => t.id === taskToMove.id)).toBe(false);

    // Target list should have 1 more item
    expect(component.inProgressTasks().length).toBe(3);
    const moved = component.inProgressTasks().find((t) => t.id === taskToMove.id);
    expect(moved).toBeDefined();
    expect(moved?.status).toBe('In progress');
  });

  it('should transfer a task to Done and update status accordingly', () => {
    const taskToMove = component.inProgressTasks()[0];

    const dropEvent = mockDropEvent({
      previousContainerId: 'In progress',
      containerId: 'Done',
      previousIndex: 0,
      currentIndex: 2,
    });

    component.drop(dropEvent);

    expect(component.inProgressTasks().length).toBe(1);
    expect(component.doneTasks().length).toBe(3);
    const moved = component.doneTasks().find((t) => t.id === taskToMove.id);
    expect(moved?.status).toBe('Done');
  });
});
