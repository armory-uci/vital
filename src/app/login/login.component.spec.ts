import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { ProblemListComponent } from '../home/problem-list/problem-list.component';
import { IUserInfo } from './login.model';
import { UserInfoService } from '../services/utility-services/user-info.service';
import { routes } from '../app-routing.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  let userInfoService: UserInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [LoginComponent, FooterComponent, ProblemListComponent],
      providers: [UserInfoService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    userInfoService = TestBed.inject(UserInfoService);
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

  it("should navigate to the Problem Page '/problem'", async(() => {
    fixture.detectChanges();
    component.login();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/problem');
    });
  }));

  it('should set user info value in utility service', async(() => {
    fixture.detectChanges();
    const USER_INFO: IUserInfo = {
      displayName: 'Test User',
      email: 'test@email.com',
      photoUrl: 'https://someprofilephotos',
      uid: '12jdbfk1233',
      idToken: 'qwertyuiop'
    };
    component.login();
    fixture.whenStable().then(() => {
      expect(userInfoService.getUserInfo()).toEqual(USER_INFO);
    });
  }));
});
