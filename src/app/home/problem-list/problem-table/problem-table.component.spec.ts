import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemTableComponent } from './problem-table.component';

describe('ProblemTableComponent', () => {
  let component: ProblemTableComponent;
  let fixture: ComponentFixture<ProblemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
