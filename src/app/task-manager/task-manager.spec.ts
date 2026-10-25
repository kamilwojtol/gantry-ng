import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskManager } from './task-manager';

describe('TaskManager', () => {
  let component: TaskManager;
  let fixture: ComponentFixture<TaskManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManager],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate initial counts correctly', () => {
    const counts = component.counts();
    expect(counts.all).toBe(component.tasks().length);
    expect(counts.all).toBeGreaterThan(0);
  });

  it('should filter tasks by status', () => {
    component.selectedStatus.set('Done');
    const filtered = component.filteredTasks();
    expect(filtered.every((t) => t.status === 'Done')).toBe(true);
  });

  it('should filter tasks by search term', () => {
    component.searchTerm.set('menu');
    const filtered = component.filteredTasks();
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.some(
        (t) =>
          t.title.toLowerCase().includes('menu') ||
          t.description.toLowerCase().includes('menu')
      )
    ).toBe(true);
  });

  it('should update task status', () => {
    const firstTask = component.tasks()[0];
    component.updateStatus(firstTask.id, 'In progress');
    const updated = component.tasks().find((t) => t.id === firstTask.id);
    expect(updated?.status).toBe('In progress');
  });
});
