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
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
