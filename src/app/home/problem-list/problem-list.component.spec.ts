import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ProblemListComponent } from './problem-list.component';
import { IProblem } from './problem.model';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app-routing.module';
import { ProblemListService } from 'src/app/services/utility-services/problem-list.service';
import { of } from 'rxjs';

const problemListServiceStub = {
  getProblems: () => of([])
};

describe('ProblemListComponent', () => {
  let component: ProblemListComponent;
  let fixture: ComponentFixture<ProblemListComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: ProblemListService, useValue: problemListServiceStub }
      ],
      declarations: [ProblemListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should navigate to the Tutorial Page', async () => {
    fixture.detectChanges();
    const problem: IProblem = {
      id: 'id',
      title: 'title',
      serverId: 'serverId',
      difficulty: 'difficulty',
      status: 'status'
    };
    component.onClick(problem);
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/tutorial');
    });
  });
});
