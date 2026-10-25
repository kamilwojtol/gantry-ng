import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardTask } from './board-task';

describe('BoardTask', () => {
  let component: BoardTask;
  let fixture: ComponentFixture<BoardTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardTask],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardTask);
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      status: 'To do',
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task title and description', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Task');
    expect(compiled.textContent).toContain('Test Description');
  });
});
