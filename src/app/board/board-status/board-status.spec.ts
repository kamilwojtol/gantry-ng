import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardStatus } from './board-status';

describe('BoardStatus', () => {
  let component: BoardStatus;
  let fixture: ComponentFixture<BoardStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardStatus);
    fixture.componentRef.setInput('status', 'To do');
    fixture.componentRef.setInput('tasks', [
      { id: 1, title: 'Task 1', description: 'Desc 1', status: 'To do' },
    ]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render status title and task count', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('To do');
    expect(compiled.textContent).toContain('1');
    expect(compiled.textContent).toContain('Task 1');
  });

  it('should show empty message when tasks array is empty', () => {
    fixture.componentRef.setInput('tasks', []);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Brak zadań w tej kolumnie');
  });
});
