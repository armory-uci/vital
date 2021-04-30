import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { ProblemListComponent } from '../home/problem-list/problem-list.component';
import { HomeComponent } from '../home/home.component';
import { TutorialPageComponent } from '../home/tutorial-page/tutorial-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ReferenceComponent } from '../reference/reference.component';
import { IUserInfo } from './login.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;

  const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'reference', component: ReferenceComponent },
    {
      path: 'home',
      component: HomeComponent,
      children: [
        { path: '', component: ProblemListComponent },
        { path: 'problem', component: ProblemListComponent },
        { path: 'tutorial', component: TutorialPageComponent }
      ]
    },
    { path: 'notfound', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/notfound' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [LoginComponent, FooterComponent, ProblemListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it("should check the current path of login component as '/'", async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    });
  }));

  it("should navigate to the Problem Page '/home/problem'", async(() => {
    fixture.detectChanges();
    const USER_INFO: IUserInfo = {
      displayName: 'Test User',
      email: 'test@email.com',
      photoUrl: 'https://someprofilephotos',
      uid: '12jdbfk1233'
    };
    component.login(USER_INFO);
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home/problem');
    });
  }));
});
