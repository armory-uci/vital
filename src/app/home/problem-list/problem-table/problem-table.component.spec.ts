import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IProblem } from '../problem.model';
import { Location } from '@angular/common';

import { ProblemTableComponent } from './problem-table.component';
import { Router } from '@angular/router';

describe('ProblemTableComponent', () => {
  let component: ProblemTableComponent;
  let fixture: ComponentFixture<ProblemTableComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should navigate to the Tutorial Page', async () => {
    fixture.detectChanges();
    const problem: IProblem = {
      id: 'id',
      title: 'title',
      serverId: 'serverId',
      difficulty: 'difficulty',
      status: '1'
    };
    component.onClick(problem);
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/tutorial');
    });
  });
});
