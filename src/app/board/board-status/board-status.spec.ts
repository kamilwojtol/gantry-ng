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
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
